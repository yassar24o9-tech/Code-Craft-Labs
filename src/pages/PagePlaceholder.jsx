import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'

function PagePlaceholder({ eyebrow, title, description }) {
  return (
    <section className="placeholder-page section-padding">
      <Container>
        <div className="placeholder-page__content">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="placeholder-page__description">{description}</p>
          <Button to="/contact">Let&apos;s talk</Button>
        </div>
      </Container>
    </section>
  )
}

export default PagePlaceholder
