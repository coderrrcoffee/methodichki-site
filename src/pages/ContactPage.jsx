import Reveal from '../components/ui/Reveal.jsx'
import CtaBand from '../components/ui/CtaBand.jsx'
import { intros, contacts } from '../content/site.js'

export default function ContactPage() {
  // Почта появится здесь автоматически, как только её добавят в контакты
  const methods = [
    { title: 'Telegram', ...contacts.telegram },
    ...(contacts.email ? [{ title: 'E-mail', ...contacts.email }] : []),
  ]

  return (
    <>
      <div className="container">
        <div className="page-header">
          <p className="eyebrow">{intros.contact.eyebrow}</p>
          <h1 className="page-header__title">{intros.contact.title}</h1>
          <p className="page-header__intro">{intros.contact.intro}</p>
        </div>
      </div>

      <section className="section section--tight">
        <div className="container contact-grid">
          <Reveal>
            <h2>Как связаться</h2>
            <div className="contact-methods">
              {methods.map((method) => (
                <div className="contact-method" key={method.title}>
                  <span className="contact-method__label">{method.title}</span>
                  <a
                    className="contact-method__value"
                    href={method.href}
                    {...(method.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {method.label}
                  </a>
                </div>
              ))}
            </div>
            <p className="muted space-top">{contacts.hours}</p>
          </Reveal>

          <Reveal>
            <h2>Не знаете, что выбрать?</h2>
            <p>
              Напишите, какой у вас класс и какая задача – подготовка к экзамену,
              уроки или самостоятельные занятия. Подскажу, какая методичка
              подойдёт, и не буду предлагать лишнее.
            </p>
            <ul className="check-list">
              <li>Помогу подобрать материал под класс и цель</li>
              <li>Отвечу на вопросы до покупки</li>
              <li>Если файл не пришёл – отправлю вручную</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
