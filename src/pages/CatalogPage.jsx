import { useMemo, useState } from 'react'
import GuideCard from '../components/guide/GuideCard.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import CtaBand from '../components/ui/CtaBand.jsx'
import { categories, guides, intros } from '../content/site.js'

export default function CatalogPage() {
  const [category, setCategory] = useState('all')
  const [view, setView] = useState('grid')

  const visible = useMemo(
    () =>
      category === 'all'
        ? guides
        : guides.filter((guide) => guide.category === category),
    [category],
  )

  const isList = view === 'list'

  return (
    <>
      <div className="container">
        <div className="page-header">
          <p className="eyebrow">{intros.catalog.eyebrow}</p>
          <h1 className="page-header__title">{intros.catalog.title}</h1>
          <p className="page-header__intro">{intros.catalog.intro}</p>
        </div>
      </div>

      <section className="section section--tight">
        <div className="container">
          <div className="catalog-toolbar">
            <div className="filters" role="group" aria-label="Категории">
              {categories.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`filter${category === item.id ? ' is-active' : ''}`}
                  aria-pressed={category === item.id}
                  onClick={() => setCategory(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="view-toggle" role="group" aria-label="Вид каталога">
              <button
                type="button"
                className={!isList ? 'is-active' : ''}
                aria-pressed={!isList}
                onClick={() => setView('grid')}
              >
                Сеткой
              </button>
              <button
                type="button"
                className={isList ? 'is-active' : ''}
                aria-pressed={isList}
                onClick={() => setView('list')}
              >
                Списком
              </button>
            </div>
          </div>

          <p className="catalog-count">Найдено методичек: {visible.length}</p>

          {visible.length === 0 ? (
            <p className="catalog-empty">
              В этой категории пока пусто – загляните позже.
            </p>
          ) : (
            <Reveal
              as="div"
              className={`guide-grid${isList ? ' guide-grid--list' : ''}`}
            >
              {visible.map((guide) => (
                <GuideCard
                  key={guide.id}
                  guide={guide}
                  variant={isList ? 'compact' : 'cover'}
                />
              ))}
            </Reveal>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
