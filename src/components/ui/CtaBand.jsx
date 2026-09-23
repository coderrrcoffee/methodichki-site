import { contacts } from '../../content/site.js'
import Button from './Button.jsx'

/**
 * Повторяющийся блок с призывом посмотреть каталог.
 * Встречается в конце страниц, поэтому вынесен в отдельный компонент.
 */
export default function CtaBand({
  title = 'Не знаете, что выбрать?',
  text = 'Напишите мне – подскажу, какая методичка подойдёт под ваш класс и задачу',
}) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <h2 className="cta-band__title">{title}</h2>
        <p className="cta-band__text">{text}</p>
        <div className="cta-band__actions">
          <Button to="/catalog">Смотреть каталог</Button>
          <Button
            href={contacts.telegram.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            Написать в Telegram
          </Button>
        </div>
      </div>
    </section>
  )
}
