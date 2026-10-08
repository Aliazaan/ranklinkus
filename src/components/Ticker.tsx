const WORDS = ['Textile Machinery', 'Cotton & Commodities', 'Consulting & Advisory', 'Armoured Vehicles', 'Ballistic Protection', 'Security Retrofitting']

/** Slow typographic ticker. Decorative: the same words appear in the capabilities section. */
export function Ticker() {
  return (
    <div className="ticker tone-ivory" aria-hidden="true">
      <div className="ticker__track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="ticker__list">
            {WORDS.map((word) => (
              <li key={word}>{word}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
