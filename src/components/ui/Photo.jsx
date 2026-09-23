/**
 * Фотография в рамке. Пока реального файла нет, показывает
 * аккуратную заглушку с подписью – вместо выдуманных стоковых фото.
 */
export default function Photo({
  src,
  alt = 'Фотография',
  caption,
  ratio = '4 / 5',
  className = '',
}) {
  return (
    <figure className={`photo ${className}`.trim()} style={{ '--photo-ratio': ratio }}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <div className="photo__placeholder" role="img" aria-label={alt}>
          <span aria-hidden="true">{alt}</span>
        </div>
      )}
      {caption && <figcaption className="photo__caption">{caption}</figcaption>}
    </figure>
  )
}
