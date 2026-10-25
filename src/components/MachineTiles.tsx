import type { Machine } from '../data/machines'
import { MachineName } from './MachineName'
import { Picture } from './Picture'
import { ScrollReveal } from './ScrollReveal'

/** Compact numbered grid of machines for the home page: main photo and name only. */
export function MachineTiles({ machines }: { machines: Machine[] }) {
  return (
    <ol className="machine-tiles">
      {machines.map((machine, index) => (
        <ScrollReveal as="li" key={machine.name} delay={(index % 5) * 70} className="machine-tile">
          <div className="machine-tile__media">
            <Picture
              name={machine.photos[0].image}
              alt={machine.photos[0].alt}
              sizes="(min-width: 1100px) 18vw, (min-width: 600px) 30vw, 46vw"
              className="machine__picture"
              imgClassName="machine__img"
            />
            <span className="machine__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <h3 className="display machine-tile__name">
            <MachineName name={machine.name} />
          </h3>
          {machine.detail && <p className="machine-tile__detail">{machine.detail}</p>}
        </ScrollReveal>
      ))}
    </ol>
  )
}
