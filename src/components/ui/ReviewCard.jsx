export default function ReviewCard({ quote, name, role }) {
  return (
    <figure className="review-card">
      <blockquote className="review-card__quote">{quote}</blockquote>
      <figcaption className="review-card__author">
        <span className="review-card__name">{name}</span>
        <span className="review-card__role">{role}</span>
      </figcaption>
    </figure>
  )
}
