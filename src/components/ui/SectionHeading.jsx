/**
 * Заголовок секции: неброский надзаголовок, заголовок и вступление.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className = '',
}) {
  return (
    <div className={`section-heading section-heading--${align} ${className}`.trim()}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-heading__title">{title}</h2>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </div>
  )
}
