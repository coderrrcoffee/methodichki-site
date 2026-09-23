import Reveal from '../components/ui/Reveal.jsx'
import ReviewCard from '../components/ui/ReviewCard.jsx'
import CtaBand from '../components/ui/CtaBand.jsx'
import { intros, reviews } from '../content/site.js'

export default function ReviewsPage() {
  return (
    <>
      <div className="container">
        <div className="page-header">
          <p className="eyebrow">{intros.reviews.eyebrow}</p>
          <h1 className="page-header__title">{intros.reviews.title}</h1>
          <p className="page-header__intro">{intros.reviews.intro}</p>
        </div>
      </div>

      <section className="section section--tight">
        <div className="container">
          <Reveal as="div" className="reviews-grid">
            {reviews.map((review) => (
              <ReviewCard
                key={`${review.role}-${review.name}`}
                quote={review.quote}
                name={review.name}
                role={review.role}
              />
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
