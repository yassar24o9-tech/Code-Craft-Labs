import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'
import PageMetadata from '../components/seo/PageMetadata.jsx'

function NotFound() {
  return (
    <>
      <PageMetadata
        title="Page Not Found | Code Craft Labs"
        description="The page you’re looking for could not be found. Return to Code Craft Labs home."
        noIndex
      />
      <section className="not-found section-padding">
        <Container>
          <div className="not-found__content">
            <p className="eyebrow">404 — page not found</p>
            <h1>This page is off the map.</h1>
            <p>The page may have moved, or the address might be incorrect.</p>
            <Button to="/">Return home</Button>
            <Link className="not-found__work-link" to="/work">
              Or explore our work
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

export default NotFound
