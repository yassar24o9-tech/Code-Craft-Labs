import { ArrowUpRight } from 'lucide-react'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'

function ContactCTA() {
  return (
    <section className="contact-cta section-padding" aria-labelledby="contact-cta-title">
      <Container>
        <div className="contact-cta__panel">
          <p className="eyebrow">Your next chapter starts with an idea</p>
          <h2 id="contact-cta-title">Have an idea worth building?</h2>
          <p>Let&apos;s turn your next digital project into something real.</p>
          <div className="contact-cta__actions">
            <Button to="/contact">
              Start a project
              <ArrowUpRight aria-hidden="true" size={17} />
            </Button>
            <Button to="/contact" variant="secondary">
              Contact us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ContactCTA
