import Reveal from '../components/ui/Reveal.jsx'
import Accordion from '../components/ui/Accordion.jsx'
import CtaBand from '../components/ui/CtaBand.jsx'
import { intros, faq } from '../content/site.js'

export default function FaqPage() {
  return (
    <>
      <div className="container">
        <div className="page-header">
          <p className="eyebrow">{intros.faq.eyebrow}</p>
          <h1 className="page-header__title">{intros.faq.title}</h1>
          <p className="page-header__intro">{intros.faq.intro}</p>
        </div>
      </div>

      <section className="section section--tight">
        <div className="container container--narrow">
          <Reveal>
            <Accordion items={faq} />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
