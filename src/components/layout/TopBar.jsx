import { NavLink } from 'react-router-dom'
import { site } from '../../content'
import './TopBar.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
]

export default function TopBar() {
  return (
    <header className="topbar">
      <span className="topbar-name">{site.name}</span>
      <nav className="topbar-nav">
        {links.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `topbar-pill${isActive ? ' is-active' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
