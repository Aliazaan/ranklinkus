// Fetches (once) and optimises every image listed in images.config.mjs.
//   npm run images
// Output: public/images/<name>-<width>.{avif,webp} and src/data/image-manifest.json
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { images, pexelsWidth } from './images.config.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const cacheDir = path.join(root, '.cache', 'stock')
const outDir = path.join(root, 'public', 'images')
const manifestPath = path.join(root, 'src', 'data', 'image-manifest.json')

await mkdir(cacheDir, { recursive: true })
await mkdir(outDir, { recursive: true })

async function loadSource(source) {
  const [kind, ref] = source.split(':')
  if (kind === 'client') return readFile(path.join(root, 'assets-src', ref))
  const file = path.join(cacheDir, `${ref}.jpg`)
  if (!existsSync(file)) {
    const url = `https://images.pexels.com/photos/${ref}/pexels-photo-${ref}.jpeg?auto=compress&w=${pexelsWidth}`
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    if (!res.ok) throw new Error(`Download failed for ${source}: ${res.status}`)
    await writeFile(file, Buffer.from(await res.arrayBuffer()))
    console.log(`  downloaded ${source}`)
  }
  return readFile(file)
}

function cropBox(w, h, ratio, [fx, fy]) {
  const target = ratio[0] / ratio[1]
  let cw = w
  let ch = Math.round(w / target)
  if (ch > h) {
    ch = h
    cw = Math.round(h * target)
  }
  const left = Math.min(Math.max(Math.round(fx * w - cw / 2), 0), w - cw)
  const top = Math.min(Math.max(Math.round(fy * h - ch / 2), 0), h - ch)
  return { left, top, width: cw, height: ch }
}

async function redact(buffer, regions = []) {
  let out = buffer
  const { width, height } = await sharp(out).metadata()
  for (const [x, y, w, h] of regions) {
    if (!w || !h) continue
    const box = {
      left: Math.round(x * width),
      top: Math.round(y * height),
      width: Math.round(w * width),
      height: Math.round(h * height),
    }
    const patch = await sharp(out).extract(box).blur(28).toBuffer()
    out = await sharp(out).composite([{ input: patch, left: box.left, top: box.top }]).toBuffer()
  }
  return out
}

// One consistent grade for all photography: slightly muted, warm highlights, firm contrast.
const grade = (img, saturation = 0.8) =>
  img
    .modulate({ saturation, brightness: 0.97 })
    .recomb([
      [1.03, 0, 0],
      [0, 1.0, 0],
      [0, 0, 0.93],
    ])
    .linear(1.07, -9)

// Optional: `npm run images -- name-a name-b` regenerates only those entries.
const only = process.argv.slice(2)
const manifest = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, 'utf8')) : {}

for (const spec of images) {
  if (only.length && !only.includes(spec.name)) continue
  const raw = await loadSource(spec.source)
  const rotated = await sharp(raw).rotate().toBuffer()
  const clean = await redact(rotated, spec.redact)
  const meta = await sharp(clean).metadata()
  const box = spec.ratio
    ? cropBox(meta.width, meta.height, spec.ratio, spec.focus ?? [0.5, 0.5])
    : { left: 0, top: 0, width: meta.width, height: meta.height }

  let base = sharp(clean).extract(box)
  if (spec.grade !== false) base = grade(base, spec.saturation)
  const cropped = await base.toBuffer()

  const widths = spec.widths.filter((w) => w <= box.width)
  if (!widths.length) widths.push(box.width)
  const largest = Math.max(...widths)
  const height = Math.round(largest * (box.height / box.width))

  for (const w of widths) {
    const resized = sharp(cropped).resize({ width: w })
    await resized.clone().webp({ quality: 76, effort: 5 }).toFile(path.join(outDir, `${spec.name}-${w}.webp`))
    await resized.clone().avif({ quality: 50, effort: 4 }).toFile(path.join(outDir, `${spec.name}-${w}.avif`))
  }

  const { dominant } = await sharp(cropped).resize(32).stats()
  const hex = (n) => n.toString(16).padStart(2, '0')
  manifest[spec.name] = {
    width: largest,
    height,
    widths,
    color: `#${hex(dominant.r)}${hex(dominant.g)}${hex(dominant.b)}`,
  }
  console.log(`✓ ${spec.name} (${widths.join('/')})`)
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`\nManifest written: ${path.relative(root, manifestPath)}`)
