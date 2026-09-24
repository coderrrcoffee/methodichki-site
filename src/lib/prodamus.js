// ============================================================
//  ПОДКЛЮЧЕНИЕ ОПЛАТЫ PRODAMUS
// ============================================================
//  Здесь живёт вся работа с платёжным виджетом «Единое окно».
//  Скрипт грузится лениво – только когда человек нажал «Купить»,
//  чтобы не тормозить сайт чужим кодом.
// ============================================================

// ВАЖНО: для боевого сайта замените на сабдомен платёжной страницы,
// например 'vashafamilia.payform.ru'. Сейчас подключена публичная
// демонстрационная страница Prodamus – деньги не списываются.
export const PRODAMUS_DOMAIN = 'demo.payform.ru'

// Тестовый режим (параметр demo_mode).
// Сейчас 0: демонстрационная страница и так не списывает деньги,
// а лишний параметр может мешать. Для тестов на боевой странице
// поставьте 1 – тогда оплата пойдёт «понарошку».
export const PRODAMUS_DEMO = 0

const INIT_JS = 'https://widget.prodamus.ru/src/init.js'
const INIT_CSS = 'https://widget.prodamus.ru/src/init.css'

let loader = null

/**
 * Загружает скрипт виджета один раз и возвращает функцию payformInit.
 * Если загрузка сорвалась или подвисла – сбрасываем состояние,
 * чтобы следующая попытка началась заново, а не упиралась в старую ошибку.
 */
export function loadProdamus() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Виджет оплаты доступен только в браузере'))
  }
  if (typeof window.payformInit === 'function') {
    return Promise.resolve(window.payformInit)
  }
  if (loader) return loader

  loader = new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${INIT_CSS}"]`)) {
      const css = document.createElement('link')
      css.rel = 'stylesheet'
      css.href = INIT_CSS
      document.head.appendChild(css)
    }

    const script = document.createElement('script')
    script.src = INIT_JS
    script.async = true

    // Страховка: если скрипт не ответил за 12 секунд, не оставляем
    // пользователя ждать бесконечно
    const failsafe = setTimeout(() => {
      script.remove()
      reject(new Error('Виджет оплаты долго не отвечает. Попробуйте ещё раз.'))
    }, 12000)

    script.onload = () => {
      clearTimeout(failsafe)
      if (typeof window.payformInit === 'function') {
        resolve(window.payformInit)
      } else {
        reject(new Error('Скрипт оплаты загрузился, но payformInit недоступен'))
      }
    }

    script.onerror = () => {
      clearTimeout(failsafe)
      script.remove()
      reject(new Error('Не удалось загрузить виджет оплаты'))
    }

    document.head.appendChild(script)
  })

  // Сбрасываем загрузчик при ошибке, чтобы можно было повторить попытку
  loader.catch(() => {
    loader = null
  })

  return loader
}

/**
 * Заранее подгружает скрипт виджета, чтобы к моменту нажатия
 * «Купить» оплата открывалась быстрее. Можно вызывать сколько угодно раз.
 */
export function preloadProdamus() {
  loadProdamus().catch(() => {
    // Молчим: если сети нет, понятную ошибку покажем при оплате.
  })
}

/**
 * Открывает окно оплаты.
 * @param {object} order
 * @param {number} order.sum   – сумма в рублях
 * @param {string} order.title – название материала (для подписи заказа)
 * @param {string} [order.id]  – номер заказа в вашей системе
 */
export async function startPayment({ sum, title, id }) {
  const payformInit = await loadProdamus()

  const params = {
    order_sum: Number(sum),
    currency: 'rub',
    version: 'beauty', // современное «Единое окно»
  }

  if (PRODAMUS_DEMO) params.demo_mode = PRODAMUS_DEMO
  if (id) params.order_id = String(id)
  if (title) params.customer_extra = title

  // Ждём результат, чтобы при ошибке показать понятное сообщение,
  // а не молчать
  await payformInit(PRODAMUS_DOMAIN, params)
  return params
}

// ---------- Статусы оплаты (postMessage от виджета) ----------

const listeners = new Set()
let listening = false

function ensureMessageListener() {
  if (listening || typeof window === 'undefined') return
  listening = true
  window.addEventListener('message', (event) => {
    const status = event.data && event.data.status
    if (!status) return
    listeners.forEach((listener) => listener(status, event.data))
  })
}

/**
 * Подписка на статусы оплаты: close | waiting | success | error.
 * Возвращает функцию отписки.
 */
export function onPaymentStatus(listener) {
  ensureMessageListener()
  listeners.add(listener)
  return () => listeners.delete(listener)
}
