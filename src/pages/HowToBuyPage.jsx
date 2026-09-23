import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Accordion from '../components/ui/Accordion.jsx'
import CtaBand from '../components/ui/CtaBand.jsx'
import { howToBuy, payment, faq } from '../content/site.js'

export default function HowToBuyPage() {
  return (
    <>
      <div className="container">
        <div className="page-header">
          <p className="eyebrow">{payment.intro.eyebrow}</p>
          <h1 className="page-header__title">{payment.intro.title}</h1>
          <p className="page-header__intro">{payment.intro.lead}</p>
        </div>
      </div>

      <section className="section section--tight">
        <div className="container">
          <Reveal as="div" className="steps">
            {howToBuy.steps.map((step) => (
              <article className="step" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <Reveal>
            <h2>{payment.methodsTitle}</h2>
            <ul className="check-list">
              {payment.methods.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h2>{payment.deliveryTitle}</h2>
            <ul className="check-list">
              {payment.delivery.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container two-col">
          <Reveal>
            <h2>{payment.guaranteeTitle}</h2>
            <ul className="check-list">
              {payment.guarantee.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h2>{payment.faqTitle}</h2>
            <Accordion items={faq.slice(0, 3)} />
          </Reveal>
        </div>
        <div className="container section-actions">
          <Button to="/catalog" variant="secondary">
            Перейти в каталог
          </Button>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
