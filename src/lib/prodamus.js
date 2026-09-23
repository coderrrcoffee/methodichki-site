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

// Тестовый режим: 1 – оплата идёт «понарошку», 0 – реальная оплата.
export const PRODAMUS_DEMO = 1

const INIT_JS = 'https://widget.prodamus.ru/src/init.js'
const INIT_CSS = 'https://widget.prodamus.ru/src/init.css'

let loader = null

/**
 * Загружает скрипт виджета один раз и возвращает функцию payformInit.
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
    script.onload = () => {
      if (typeof window.payformInit === 'function') {
        resolve(window.payformInit)
      } else {
        reject(new Error('Скрипт оплаты загрузился, но payformInit недоступен'))
      }
    }
    script.onerror = () => reject(new Error('Не удалось загрузить виджет оплаты'))
    document.head.appendChild(script)
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
 * @param {string} order.title – название методички (попадёт в чек)
 * @param {string} [order.id]  – номер заказа в вашей системе
 */
export async function startPayment({ sum, title, id }) {
  const payformInit = await loadProdamus()

  const params = {
    currency: 'rub',
    version: 'beauty', // современное «Единое окно»
    // Название и цена позиции – из этого формируется чек
    products: [
      {
        name: title,
        price: Number(sum),
        quantity: 1,
        type: 'goods',
      },
    ],
  }

  if (PRODAMUS_DEMO) params.demo_mode = PRODAMUS_DEMO
  if (id) params.order_id = String(id)

  payformInit(PRODAMUS_DOMAIN, params)
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
