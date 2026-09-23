import { useEffect, useRef, useState } from 'react'
import { onPaymentStatus, preloadProdamus, startPayment } from '../../lib/prodamus.js'

/**
 * Кнопка «Купить» с окном оплаты Prodamus.
 * Показывает состояние: открываю → оплата → результат.
 *
 * Важно: статусы оплаты приходят в браузер общим событием, поэтому
 * каждая кнопка реагирует только на ту оплату, которую открыла она сама.
 */
export default function BuyButton({
  sum,
  title,
  id,
  variant = 'primary',
  label = 'Купить',
  className = '',
}) {
  const [state, setState] = useState('idle')
  const [message, setMessage] = useState('')
  const isActive = useRef(false)

  // Подгружаем виджет заранее – как только кнопка появилась на экране.
  // Так по клику оплата открывается быстрее.
  useEffect(() => {
    preloadProdamus()
  }, [])

  useEffect(() => {
    return onPaymentStatus((status) => {
      if (!isActive.current) return

      if (status === 'waiting') {
        setMessage('Обрабатываю оплату…')
      } else if (status === 'success') {
        isActive.current = false
        setState('success')
        setMessage('Оплата прошла. Спасибо! Материалы придут на почту.')
      } else if (status === 'error') {
        isActive.current = false
        setState('error')
        setMessage('Оплата не прошла. Попробуйте ещё раз.')
      } else if (status === 'close') {
        isActive.current = false
        setState('idle')
        setMessage('')
      }
    })
  }, [])

  async function handleClick() {
    isActive.current = true
    setState('loading')
    setMessage('Открываю окно оплаты…')
    try {
      await startPayment({ sum, title, id })
      setState('opened')
    } catch (error) {
      isActive.current = false
      setState('error')
      setMessage(error?.message || 'Не удалось открыть окно оплаты')
    }
  }

  const busy = state === 'loading'

  return (
    <div className={`buy ${className}`.trim()} data-state={state}>
      <button
        type="button"
        className={`btn btn--${variant} buy__button`}
        onClick={handleClick}
        onMouseEnter={preloadProdamus}
        onFocus={preloadProdamus}
        disabled={busy}
        aria-busy={busy}
      >
        {busy ? 'Открываю…' : label}
      </button>
      <p className="buy__status" role="status" aria-live="polite">
        {message}
      </p>
    </div>
  )
}
