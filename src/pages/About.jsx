import { ArrowUpRight } from 'lucide-react'
import PageMetadata from '../components/seo/PageMetadata.jsx'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'

const principles = [
  ['Start with the need', 'We first understand the people, goals, and constraints behind a project.'],
  ['Make it easy to use', 'Clear structure, readable content, and accessible interactions belong in every experience.'],
  ['Choose practical technology', 'We build with tools that fit the requirements and can be maintained beyond launch.'],
  ['Keep communication open', 'Shared expectations and straightforward updates make collaboration more useful.'],
]

function About() {
  return (
    <>
      <PageMetadata
        title="About Code Craft Labs | Digital Agency"
        description="Code Craft Labs is an independent digital agency focused on useful design, modern technology, and practical digital solutions."
        path="/about"
      />
      <PageHeader
        eyebrow="About Code Craft Labs"
        title="Practical thinking. Thoughtful technology."
        description="We help businesses and organizations make useful digital experiences from the ideas they want to move forward."
      />
      <section className="about-intro section-padding">
        <Container className="about-intro__grid">
          <p className="eyebrow">Our mission</p>
          <div>
            <h2>Make digital work more useful for the people it serves.</h2>
            <p>
              Code Craft Labs brings design and development together to solve real
              problems. We aim to make the process clear, the result dependable, and
              the technology appropriate to the task.
            </p>
          </div>
        </Container>
      </section>
      <section className="about-vision section-padding">
        <Container className="about-vision__grid">
          <div>
            <p className="eyebrow">Our vision</p>
            <h2>Build a future where good ideas can work in the real world.</h2>
          </div>
          <p>
            We want organizations of every size to have access to thoughtful,
            maintainable digital tools—from a first website to a more ambitious
            application—without losing sight of the people who depend on them.
          </p>
        </Container>
      </section>
      <section className="about-principles section-padding">
        <Container>
          <p className="eyebrow">How we work</p>
          <h2>A considered approach, at every step.</h2>
          <div className="about-principles__list">
            {principles.map(([title, description], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="about-cta section-padding">
        <Container className="about-cta__inner">
          <div>
            <p className="eyebrow">Let&apos;s build something useful</p>
            <h2>Tell us what you&apos;re thinking about.</h2>
          </div>
          <Button to="/contact">
            Start a conversation
            <ArrowUpRight aria-hidden="true" size={17} />
          </Button>
        </Container>
      </section>
    </>
  )
}

export default About
