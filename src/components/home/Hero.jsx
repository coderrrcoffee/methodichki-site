import Button from '../ui/Button.jsx'
import GuideCover from '../guide/GuideCover.jsx'
import { guides, hero } from '../../content/site.js'

// Обложки, которые показываем на первом экране
const SHOWCASE_IDS = ['ege-27', 'soch-93', 'orfografiya-shemy']

export default function Hero() {
  const showcase = SHOWCASE_IDS.map((id) =>
    guides.find((guide) => guide.id === id),
  ).filter(Boolean)

  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__content">
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

        <div className="hero__media">
          <div className="hero__showcase" aria-hidden="true">
            {showcase.map((guide, index) => (
              <GuideCover
                key={guide.id}
                title={guide.title}
                subtitle={guide.subtitle}
                category={guide.category}
                className={index === 0 ? 'guide-cover--lg' : 'guide-cover--sm'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
