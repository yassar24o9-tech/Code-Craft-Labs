import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the business, audience, requirements, and goals.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Plan the structure, visual direction, and user experience.',
  },
  {
    number: '03',
    title: 'Develop',
    description: 'Build a responsive, functional, maintainable solution.',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Test, deploy, and support the agreed delivery.',
  },
]

function ProcessSection() {
  return (
    <section className="process-section section-padding" aria-labelledby="process-title">
      <Container>
        <SectionHeading
          id="process-title"
          eyebrow="The process"
          title="A clear path from first conversation to launch."
          description="The details vary by project, but the work moves through four practical stages."
        />
        <ol className="process-list">
          {steps.map(({ number, title, description }, index) => (
            <li className="process-step" key={number}>
              <div className="process-step__top">
                <span>{number}</span>
                {index < steps.length - 1 && <ArrowRight aria-hidden="true" size={18} />}
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

export default ProcessSection
