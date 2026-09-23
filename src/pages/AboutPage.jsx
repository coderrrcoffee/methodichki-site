import Reveal from '../components/ui/Reveal.jsx'
import Photo from '../components/ui/Photo.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import CtaBand from '../components/ui/CtaBand.jsx'
import { aboutPage } from '../content/site.js'

export default function AboutPage() {
  return (
    <>
      <div className="container">
        <div className="page-header">
          <p className="eyebrow">{aboutPage.eyebrow}</p>
          <h1 className="page-header__title">{aboutPage.title}</h1>
          <p className="page-header__intro">{aboutPage.lead}</p>
        </div>
      </div>

      <section className="section section--tight">
        <div className="container about-grid">
          <Reveal>
            <Photo alt="Фото автора" ratio="4 / 5" className="about-photo" />
            {aboutPage.photoCaption && (
              <p className="about-caption">{aboutPage.photoCaption}</p>
            )}
            <p className="about-note">{aboutPage.photoNote}</p>
          </Reveal>

          <Reveal>
            <h2>{aboutPage.storyTitle}</h2>
            {aboutPage.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <h2 className="space-top">{aboutPage.credsTitle}</h2>
            <ul className="check-list">
              {aboutPage.creds.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={aboutPage.eyebrow}
              title={aboutPage.principlesTitle}
            />
          </Reveal>
          <Reveal as="div" className="benefits">
            {aboutPage.principles.map((item) => (
              <article className="benefit" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
