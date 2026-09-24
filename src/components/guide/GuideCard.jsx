import BuyButton from './BuyButton.jsx'
import GuideCover from './GuideCover.jsx'
import { categoryLabels, formatPrice } from '../../lib/format.js'

/**
 * Карточка методички. Три варианта оформления:
 *  - cover   – с обложкой (по умолчанию);
 *  - compact – без обложки, компактная строка;
 *  - featured – крупная, с обложкой и акцентом.
 */
export default function GuideCard({ guide, variant = 'cover', className = '' }) {
  const { title, subtitle, text, price, category, level, pages, badge } = guide
  const categoryLabel = categoryLabels[category] ?? ''
  // Отметка не должна повторять категорию – иначе на карточке дубль
  const showBadge = Boolean(badge) && badge !== categoryLabel

  return (
    <article className={`guide-card guide-card--${variant} ${className}`.trim()}>
      {variant !== 'compact' && (
        <GuideCover
          title={title}
          subtitle={subtitle}
          category={category}
          className="guide-card__cover"
          decorative
        />
      )}

      <div className="guide-card__body">
        <div className="guide-card__meta">
          {showBadge && <span className="guide-card__badge">{badge}</span>}
          <span className="guide-card__cat">{categoryLabel}</span>
        </div>

        <h3 className="guide-card__title">{title}</h3>
        {subtitle && <p className="guide-card__subtitle">{subtitle}</p>}
        <p className="guide-card__text">{text}</p>

        <ul className="guide-card__facts">
          <li>{level}</li>
          <li>{pages} стр.</li>
          <li>PDF</li>
        </ul>

        <div className="guide-card__footer">
          <span className="guide-card__price">{formatPrice(price)}</span>
          <BuyButton
            sum={price}
            title={title}
            id={guide.id}
            className="guide-card__buy"
          />
        </div>
      </div>
    </article>
  )
}
