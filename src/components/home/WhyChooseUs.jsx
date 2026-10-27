import { Accessibility, Gauge, MessageCircle, Wrench } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

const principles = [
  {
    title: 'People before pixels',
    description: 'We make decisions around the people who will use the finished product.',
    icon: Accessibility,
  },
  {
    title: 'Built to keep working',
    description: 'Responsive, performance-conscious code that can be understood and maintained.',
    icon: Wrench,
  },
  {
    title: 'Speed with purpose',
    description: 'We focus on a lean, efficient experience—not effects that get in the way.',
    icon: Gauge,
  },
  {
    title: 'Clear communication',
    description: 'Practical conversations help keep decisions and next steps understandable.',
    icon: MessageCircle,
  },
]

function WhyChooseUs() {
  return (
    <section className="principles-section section-padding" aria-labelledby="principles-title">
      <Container className="principles-section__layout">
        <div className="principles-section__intro">
          <SectionHeading
            id="principles-title"
            eyebrow="How we think"
            title="Good partnerships are built on good decisions."
            description="A thoughtful process, open communication, and technology chosen for the problem at hand."
          />
        </div>
        <div className="principles-list">
          {principles.map(({ title, description, icon: Icon }, index) => (
            <article className="principle" key={title}>
              <span className="principle__index">0{index + 1}</span>
              <Icon aria-hidden="true" className="principle__icon" size={22} strokeWidth={1.5} />
              <div className="principle__copy">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default WhyChooseUs
