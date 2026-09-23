import { Link } from 'react-router-dom'
import { nav, shop, contacts } from '../../content/site.js'
import avatar from '../../assets/avatar.jpg'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">{shop.name}</p>
          <p className="site-footer__role">{shop.authorRole}</p>
        </div>

        <nav className="site-footer__nav" aria-label="Навигация в подвале">
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__contacts">
          <a
            href={contacts.telegram.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contacts.telegram.label}
          </a>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>
          © {new Date().getFullYear()} {shop.name}
        </p>
        <a
          className="credit"
          href="https://t.me/codercoffee"
          target="_blank"
          rel="noopener noreferrer"
          title="Сайт создал kitten · @codercoffee"
        >
          <img
            className="credit__avatar"
            src={avatar}
            alt=""
            width="32"
            height="32"
            loading="lazy"
          />
          <span className="credit__text">
            <span className="credit__label">Сайт создал</span>
            <span className="credit__name">
              kitten <span className="credit__handle">@codercoffee</span>
            </span>
          </span>
        </a>
      </div>
    </footer>
  )
}
