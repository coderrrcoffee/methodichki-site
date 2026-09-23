import { useEffect, useRef, useState } from 'react'

/**
 * Мягко проявляет содержимое при прокрутке.
 * Уважает настройку «уменьшить движение» (см. стили .reveal).
 */
export default function Reveal({
  as: Tag = 'div',
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      // threshold: 0 – срабатывает, как только элемент начал появляться.
      // Важно для высоких блоков (например, длинного списка карточек
      // на телефоне): при большом пороге они могли не проявиться вовсе.
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  )
}
