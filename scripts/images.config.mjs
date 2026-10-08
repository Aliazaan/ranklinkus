// Image manifest for the Dada Sons Group website.
//
// Each entry produces `<name>-<width>.avif|webp` in public/images and an entry in
// src/data/image-manifest.json (used by the <Picture> component to avoid layout shift).
//
// source:  "pexels:<id>"  -> downloaded once into .cache/stock (Pexels licence: free for
//                            commercial use, attribution not required)
//          "client:<file>" -> a real client asset from /assets-src
// ratio:   [w, h] crop ratio. Omit to keep the source ratio.
// focus:   [x, y] focal point (0-1) the crop is centred on.
// redact:  [x, y, w, h] regions (0-1, on the source) that are blurred before cropping
//          (used to obscure licence plates on stock photography).
// saturation: optional override for the shared colour grade (default 0.8).
// alt is intentionally NOT stored here — alt text is written where each image is used.

const WIDE = [768, 1280, 1920]
const HERO = [768, 1280, 1920, 2400]
const CARD = [640, 960, 1280]
const TILE = [480, 768, 1024]
const GAL = [640, 1000, 1400]

// Plate on the black G-Class (pexels 16717543)
const G_CLASS_PLATE = [0.54, 0.578, 0.26, 0.06]
// Plate on the dark SUV tail-light shot (pexels 13286329)
const SUV_PLATE = [0.72, 0.595, 0.115, 0.075]

export const images = [
  // ── Heroes ────────────────────────────────────────────────────────────────
  { name: 'hero-textile-machinery', source: 'pexels:36327497', ratio: [16, 9], focus: [0.5, 0.44], widths: HERO },
  { name: 'hero-dada-sons', source: 'pexels:8246482', ratio: [16, 9], focus: [0.45, 0.5], widths: HERO },
  { name: 'hero-about', source: 'pexels:38357014', ratio: [16, 9], focus: [0.4, 0.5], widths: WIDE },
  { name: 'hero-industries', source: 'pexels:29976478', ratio: [16, 9], focus: [0.5, 0.55], widths: WIDE },
  { name: 'hero-solutions', source: 'pexels:36327502', ratio: [16, 9], focus: [0.5, 0.5], widths: WIDE },
  { name: 'hero-projects', source: 'pexels:6615235', ratio: [16, 9], focus: [0.45, 0.6], widths: WIDE },
  { name: 'hero-insights', source: 'pexels:10328901', ratio: [16, 9], focus: [0.5, 0.5], widths: WIDE },
  { name: 'hero-contact', source: 'pexels:29198153', ratio: [16, 9], focus: [0.55, 0.55], widths: WIDE },
  { name: 'cta-background', source: 'pexels:8973680', ratio: [16, 9], focus: [0.55, 0.55], widths: WIDE },

  // ── Hero slideshow (home) and Armour Tech hero ────────────────────────────
  { name: 'hero-slide-machinery', source: 'pexels:8246481', ratio: [16, 9], focus: [0.5, 0.5], widths: HERO },
  { name: 'hero-slide-machinery-portrait', source: 'pexels:8246481', ratio: [4, 5], focus: [0.5, 0.5], widths: [480, 800, 1100] },
  { name: 'hero-slide-vehicle', source: 'pexels:19067088', ratio: [16, 9], focus: [0.35, 0.55], widths: HERO },
  { name: 'hero-slide-vehicle-portrait', source: 'pexels:19067088', ratio: [4, 5], focus: [0.3, 0.55], widths: [480, 800, 1100] },
  { name: 'hero-slide-looms', source: 'pexels:16472162', ratio: [16, 9], focus: [0.5, 0.5], widths: HERO },
  { name: 'hero-slide-looms-portrait', source: 'pexels:16472162', ratio: [4, 5], focus: [0.45, 0.5], widths: [480, 800, 1100] },

  // ── Gallery: textile machinery (illustrative stock) ───────────────────────
  { name: 'gal-looms', source: 'pexels:16472162', ratio: [3, 2], focus: [0.45, 0.5], widths: GAL },
  { name: 'gal-white-threads', source: 'pexels:32655890', ratio: [3, 2], focus: [0.5, 0.5], widths: GAL },
  { name: 'gal-mill-interior', source: 'pexels:16176408', ratio: [3, 2], focus: [0.4, 0.5], widths: GAL },
  { name: 'gal-knitting', source: 'pexels:36327501', ratio: [3, 2], focus: [0.5, 0.5], widths: GAL },
  { name: 'gal-gears', source: 'pexels:31742337', ratio: [3, 2], focus: [0.5, 0.5], widths: GAL },
  { name: 'gal-weaving-hall', source: 'pexels:18293962', ratio: [3, 2], focus: [0.5, 0.5], widths: GAL },
  { name: 'gal-bobbins', source: 'pexels:8246486', ratio: [3, 2], focus: [0.4, 0.5], widths: GAL },

  // ── Gallery: vehicle protection (illustrative stock) ──────────────────────
  { name: 'gal-suv-studio', source: 'pexels:19067088', ratio: [3, 2], focus: [0.4, 0.5], widths: GAL },
  { name: 'gal-headlamp', source: 'pexels:9330752', ratio: [3, 2], focus: [0.6, 0.5], widths: GAL },
  { name: 'gal-door-detail', source: 'pexels:16255324', ratio: [3, 2], focus: [0.5, 0.5], widths: GAL },
  { name: 'gal-matte-black', source: 'pexels:28571809', ratio: [3, 2], focus: [0.5, 0.5], widths: GAL },
  { name: 'gal-armoured-front', source: 'pexels:29787615', ratio: [3, 2], focus: [0.5, 0.5], widths: GAL },
  { name: 'gal-armoured-workshop', source: 'pexels:10981370', ratio: [3, 2], focus: [0.4, 0.55], widths: GAL },
  { name: 'gal-night-lamps', source: 'pexels:35493424', ratio: [3, 2], focus: [0.5, 0.45], widths: GAL, redact: [[0.86, 0.8, 0.14, 0.2]] },

  // ── Business division cards ───────────────────────────────────────────────
  { name: 'business-dada-sons', source: 'pexels:38357014', ratio: [4, 5], focus: [0.35, 0.56], widths: CARD },
  { name: 'business-armour-tech', source: 'pexels:16717543', ratio: [4, 5], focus: [0.5, 0.5], widths: CARD, redact: [G_CLASS_PLATE] },

  // ── Industries ────────────────────────────────────────────────────────────
  { name: 'industry-textile', source: 'pexels:8246482', ratio: [4, 5], focus: [0.4, 0.5], widths: TILE },
  { name: 'industry-security', source: 'pexels:5589597', ratio: [4, 5], focus: [0.5, 0.45], widths: TILE },
  { name: 'industry-automotive', source: 'pexels:13286329', ratio: [4, 5], focus: [0.62, 0.62], widths: TILE, redact: [SUV_PLATE] },
  { name: 'industry-industrial', source: 'pexels:29976478', ratio: [4, 5], focus: [0.5, 0.55], widths: TILE },
  { name: 'industry-trading', source: 'pexels:3840441', ratio: [4, 5], focus: [0.4, 0.5], widths: TILE, saturation: 0.6 },

  // ── Solutions ─────────────────────────────────────────────────────────────
  { name: 'solution-textile-machinery', source: 'pexels:8246480', ratio: [4, 3], focus: [0.5, 0.5], widths: CARD },
  { name: 'solution-cotton', source: 'pexels:6698273', ratio: [4, 3], focus: [0.5, 0.7], widths: CARD, saturation: 0.5 },
  { name: 'solution-consulting', source: 'pexels:6615235', ratio: [4, 3], focus: [0.5, 0.6], widths: CARD },
  { name: 'solution-armoured-vehicles', source: 'pexels:34561429', ratio: [4, 3], focus: [0.6, 0.55], widths: CARD },
  { name: 'solution-bulletproof-mirrors', source: 'pexels:15071550', ratio: [4, 3], focus: [0.5, 0.45], widths: CARD },
  { name: 'solution-security-retrofitting', source: 'pexels:29198153', ratio: [4, 3], focus: [0.6, 0.55], widths: CARD },

  // ── Division page sections ────────────────────────────────────────────────
  { name: 'cotton-field', source: 'pexels:6698273', ratio: [3, 2], focus: [0.5, 0.6], widths: CARD, saturation: 0.5 },
  { name: 'cotton-harvest', source: 'pexels:13924881', ratio: [3, 2], focus: [0.5, 0.55], widths: CARD, saturation: 0.5 },

  // ── Insights ──────────────────────────────────────────────────────────────
  { name: 'insight-textile', source: 'pexels:8246743', ratio: [3, 2], focus: [0.5, 0.5], widths: CARD },
  { name: 'insight-security', source: 'pexels:14534706', ratio: [3, 2], focus: [0.5, 0.5], widths: CARD },
  { name: 'insight-industrial', source: 'pexels:7548828', ratio: [3, 2], focus: [0.5, 0.45], widths: CARD, saturation: 0.45 },
  { name: 'insight-cotton', source: 'pexels:10287684', ratio: [3, 2], focus: [0.5, 0.6], widths: CARD, saturation: 0.55 },
  { name: 'insight-automotive', source: 'pexels:13010607', ratio: [3, 2], focus: [0.6, 0.5], widths: CARD },
  { name: 'insight-machinery', source: 'pexels:6717035', ratio: [3, 2], focus: [0.5, 0.5], widths: CARD },

  // ── Leadership (real client asset) ───────────────────────────────────────
  { name: 'ceo-portrait', source: 'client:ceo-muhammad-asif-bhati.jpg', ratio: [4, 5], focus: [0.56, 0.36], widths: [480, 800, 1100], grade: false },
]

export const pexelsWidth = 2400
