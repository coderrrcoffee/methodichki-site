/**
 * Обложка методички. Пока нет реальных картинок, рисуем
 * аккуратную «обложку» из цветов сайта – вместо стоковых фото.
 */
export default function GuideCover({ title, subtitle, category, className = '' }) {
  return (
    <div
      className={`guide-cover guide-cover--${category} ${className}`.trim()}
      role="img"
      aria-label={title}
    >
      <span className="guide-cover__format">PDF</span>
      <span className="guide-cover__title">{title}</span>
      {subtitle && <span className="guide-cover__subtitle">{subtitle}</span>}
    </div>
  )
}
