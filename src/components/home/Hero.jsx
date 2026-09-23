import Button from '../ui/Button.jsx'
import GuideCover from '../guide/GuideCover.jsx'
import { guides, hero } from '../../content/site.js'
import { categoryLabels, formatPrice } from '../../lib/format.js'

// Обложки, которые стоят на «полке» первого экрана
const SHELF_IDS = ['soch-93', 'ege-27', 'oge-test', 'orfografiya-shemy', 'konspekt-uroka']

export default function Hero() {
  const shelf = SHELF_IDS.map((id) => guides.find((guide) => guide.id === id)).filter(
    Boolean,
  )

  return (
    <section className="hero">
      <div className="container hero__inner">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 className="hero__title">{hero.title}</h1>
        <p className="hero__text">{hero.text}</p>
        <div className="hero__actions">
          <Button to="/catalog">{hero.primaryCta}</Button>
          <Button to="/how-to-buy" variant="secondary">
            {hero.secondaryCta}
          </Button>
        </div>
        <p className="hero__note">{hero.note}</p>
      </div>

      <div className="container hero__shelf-wrap">
        <ul className="hero__shelf">
          {shelf.map((guide) => (
            <li className="shelf-item" key={guide.id}>
              <GuideCover
                title={guide.title}
                subtitle={guide.subtitle}
                category={guide.category}
                className="shelf-item__cover"
              />
              <div className="shelf-item__meta">
                <span className="shelf-item__cat">
                  {categoryLabels[guide.category]}
                </span>
                <span className="shelf-item__price">{formatPrice(guide.price)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
