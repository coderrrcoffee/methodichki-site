import { useId, useState } from 'react'

function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <div className={`accordion__item${open ? ' is-open' : ''}`}>
      <h3 className="accordion__heading">
        <button
          type="button"
          id={`${id}-button`}
          className="accordion__summary"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{question}</span>
          <span className="accordion__icon" aria-hidden="true" />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className="accordion__answer"
      >
        <div className="accordion__answer-inner">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

/**
 * Список вопросов и ответов с плавным раскрытием.
 * Реализован на кнопках (доступно с клавиатуры), высота анимируется.
 */
export default function Accordion({ items }) {
  return (
    <div className="accordion">
      {items.map((item) => (
        <AccordionItem key={item.q} question={item.q} answer={item.a} />
      ))}
    </div>
  )
}
