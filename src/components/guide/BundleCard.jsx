import BuyButton from './BuyButton.jsx'
import { formatPrice } from '../../lib/format.js'

/**
 * Карточка набора из нескольких методичек.
 */
export default function BundleCard({ bundle }) {
  const { title, price, oldPrice, unit, includes, featured = false } = bundle

  return (
    <article className={`bundle${featured ? ' bundle--featured' : ''}`}>
      {featured && <span className="bundle__badge">Выгоднее всего</span>}
      <h3 className="bundle__title">{title}</h3>
      <p className="bundle__unit">{unit}</p>

      <p className="bundle__price">
        {formatPrice(price)}
        {oldPrice && <span className="bundle__old">{formatPrice(oldPrice)}</span>}
      </p>

      <ul className="check-list bundle__list">
        {includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <BuyButton
        sum={price}
        title={title}
        variant={featured ? 'primary' : 'secondary'}
        label="Купить набор"
        className="bundle__buy"
      />
    </article>
  )
}
