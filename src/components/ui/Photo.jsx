/**
 * Фотография в рамке.
 * Пока реального файла нет, показываем аккуратную нейтральную
 * подложку без надписей – чтобы это выглядело как часть дизайна,
 * а не как пустое место в шаблоне.
 */
export default function Photo({
  src,
  alt = 'Иллюстрация',
  caption,
  ratio = '4 / 5',
  className = '',
}) {
  return (
    <figure className={`photo ${className}`.trim()} style={{ '--photo-ratio': ratio }}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <div className="photo__placeholder" role="img" aria-label={alt} />
      )}
      {caption && <figcaption className="photo__caption">{caption}</figcaption>}
    </figure>
  )
}
