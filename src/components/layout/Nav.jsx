import { NavLink } from 'react-router-dom'

/**
 * Навигация по страницам. Используется и в шапке,
 * и в мобильном меню (там задаются свои стили).
 */
export default function Nav({ items, className = '', onNavigate }) {
  return (
    <nav className={className} aria-label="Основная навигация">
      <ul className="nav__list">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              onClick={onNavigate}
              className={({ isActive }) =>
                `nav__link${isActive ? ' is-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
