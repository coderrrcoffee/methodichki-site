import Hero from '../components/home/Hero.jsx'
import Button from '../components/ui/Button.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Accordion from '../components/ui/Accordion.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import CtaBand from '../components/ui/CtaBand.jsx'
import Photo from '../components/ui/Photo.jsx'
import ReviewCard from '../components/ui/ReviewCard.jsx'
import GuideCard from '../components/guide/GuideCard.jsx'
import BundleCard from '../components/guide/BundleCard.jsx'
import {
  stats,
  benefits,
  guides,
  bundles,
  audience,
  author,
  howToBuy,
  reviews,
  faq,
} from '../content/site.js'

// На главной показываем те методички, у которых есть отметка
const featured = guides.filter((guide) => guide.badge).slice(0, 3)

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="section section--tight" aria-label="Коротко о каталоге">
        <div className="container">
          <div className="stats">
            {stats.map((item) => (
              <div className="stat" key={item.label}>
                <div className="stat__value">{item.value}</div>
                <div className="stat__label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={benefits.eyebrow}
              title={benefits.title}
            />
          </Reveal>
          <Reveal as="div" className="benefits">
            {benefits.items.map((item) => (
              <article className="benefit" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Каталог"
              title="С чего часто начинают"
              intro="Несколько методичек, которые берут чаще всего"
            />
          </Reveal>
          <Reveal as="div" className="guide-grid">
            {featured.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </Reveal>
          <div className="section-actions">
            <Button to="/catalog" variant="secondary">
              Весь каталог
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={bundles.eyebrow}
              title={bundles.title}
              intro={bundles.intro}
            />
          </Reveal>
          <Reveal as="div" className="bundles-grid">
            {bundles.items.map((bundle) => (
              <BundleCard key={bundle.title} bundle={bundle} />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <Reveal as="div" className="author">
            <Photo alt="Фото автора" ratio="4 / 5" className="author__photo" />
            <div>
              <p className="eyebrow">{author.eyebrow}</p>
              <h2>{author.title}</h2>
              <p className="lead space-top">{author.text}</p>
              <p className="author__note">{author.note}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={audience.eyebrow}
              title={audience.title}
            />
          </Reveal>
          <div className="two-col">
            {audience.groups.map((group) => (
              <Reveal key={group.title}>
                <h3 className="column-title">{group.title}</h3>
                <ul className="check-list">
                  {group.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={howToBuy.eyebrow}
              title={howToBuy.title}
            />
          </Reveal>
          <Reveal as="div" className="steps">
            {howToBuy.steps.map((step) => (
              <article className="step" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </Reveal>
          <div className="section-actions">
            <Button to="/how-to-buy" variant="secondary">
              Подробнее об оплате
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Отзывы" title="Что говорят покупатели" />
          </Reveal>
          <Reveal as="div" className="reviews-grid">
            {reviews.slice(0, 4).map((review) => (
              <ReviewCard
                key={`${review.role}-${review.name}`}
                quote={review.quote}
                name={review.name}
                role={review.role}
              />
            ))}
          </Reveal>
          <div className="section-actions">
            <Button to="/reviews" variant="secondary">
              Все отзывы
            </Button>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Вопросы" title="Частые вопросы" />
          </Reveal>
          <Reveal>
            <Accordion items={faq.slice(0, 4)} />
          </Reveal>
          <div className="section-actions">
            <Button to="/faq" variant="secondary">
              Все вопросы
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
