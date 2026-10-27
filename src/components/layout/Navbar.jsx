import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from '../ui/Button.jsx'

const navigationItems = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
]

function Navbar() {
  const [openOnPath, setOpenOnPath] = useState(null)
  const location = useLocation()
  const menuOpen = openOnPath === location.pathname

  useEffect(() => {
    if (!menuOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') setOpenOnPath(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <Link
          className="brand"
          to="/"
          aria-label="Code Craft Labs home"
          onClick={() => setOpenOnPath(null)}
        >
          <img
            className="brand__logo"
            src="/Code-Craft-Labs%20logo.jpeg"
            alt="Code Craft Labs — Building solutions. Crafting futures."
            width="72"
            height="72"
          />
        </Link>

        <button
          className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setOpenOnPath(menuOpen ? null : location.pathname)}
        >
          <span />
          <span />
        </button>

        <nav
          className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          <div className="primary-navigation__links">
            {navigationItems.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `navigation-link${isActive ? ' is-active' : ''}`
                }
                onClick={() => setOpenOnPath(null)}
              >
                {label}
              </NavLink>
            ))}
          </div>
          <Button
            to="/contact"
            className="navigation-cta"
            onClick={() => setOpenOnPath(null)}
          >
            Let&apos;s talk
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
