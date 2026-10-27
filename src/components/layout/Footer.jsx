import { Link } from 'react-router-dom'
import Container from '../ui/Container.jsx'

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const serviceLinks = [
  { label: 'Website development', to: '/services#website-development' },
  { label: 'Web applications', to: '/services#web-application-development' },
  { label: 'AI-powered solutions', to: '/services#ai-powered-solutions' },
]

function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <Link to="/" aria-label="Code Craft Labs home">
              <img
                src="/Code-Craft-Labs%20logo.jpeg"
                alt="Code Craft Labs — Building solutions. Crafting futures."
                width="88"
                height="88"
                loading="lazy"
              />
            </Link>
            <p>BUILDING SOLUTIONS. CRAFTING FUTURES.</p>
          </div>
          <nav aria-label="Footer navigation" className="site-footer__links">
            {footerLinks.map(({ label, to }) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Services" className="site-footer__service-links">
            <p className="eyebrow">Services</p>
            {serviceLinks.map(({ label, to }) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Code Craft Labs. All rights reserved.</p>
          <p>Independent digital agency</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
