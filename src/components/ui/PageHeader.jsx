import Container from './Container.jsx'

function PageHeader({ eyebrow, title, description, children }) {
  return (
    <section className="page-header">
      <Container>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p className="page-header__description">{description}</p>}
        {children}
      </Container>
    </section>
  )
}

export default PageHeader
