import { ArrowDown } from 'lucide-react'
import Container from '../ui/Container.jsx'

function TrustSection() {
  return (
    <section className="intro-section section-padding" aria-labelledby="intro-title">
      <Container className="intro-section__layout">
        <div className="intro-section__label">
          <p className="eyebrow">Useful by design</p>
          <ArrowDown aria-hidden="true" size={19} strokeWidth={1.5} />
        </div>
        <div className="intro-section__copy">
          <h2 id="intro-title">
            Digital work should make <span className="text-gradient">good things</span>{' '}
            easier to do.
          </h2>
          <p>
            Every project starts with understanding the people it needs to serve. We
            bring thoughtful design and modern technology together to create digital
            experiences with a clear purpose.
          </p>
        </div>
      </Container>
    </section>
  )
}

export default TrustSection
