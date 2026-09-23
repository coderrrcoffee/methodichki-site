import Button from './Button.jsx'

export default function PriceCard({
  title,
  price,
  unit,
  features = [],
  featured = false,
  badge = 'Популярный',
}) {
  return (
    <article className={`price-card${featured ? ' price-card--featured' : ''}`}>
      {featured && <span className="price-card__badge">{badge}</span>}
      <div>
        <h3 className="price-card__title">{title}</h3>
        <p className="price-card__price">{price}</p>
        <p className="price-card__unit">{unit}</p>
      </div>
      <ul className="check-list">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <Button
        to="/contact"
        variant={featured ? 'primary' : 'secondary'}
        className="price-card__btn"
      >
        Записаться
      </Button>
    </article>
  )
}
