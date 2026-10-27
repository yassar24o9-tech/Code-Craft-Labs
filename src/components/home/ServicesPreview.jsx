import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import services from '../../data/services.js'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import ServiceCard from '../services/ServiceCard.jsx'

function ServicesPreview() {
  return (
    <section className="services-section section-padding" aria-labelledby="services-title">
      <Container>
        <div className="services-section__heading">
          <SectionHeading
            id="services-title"
            eyebrow="What we do"
            title="Technology with a job to do."
            description="From your first business website to a custom digital tool, we build around the outcome you need."
          />
          <Link className="text-link" to="/services">
            All services
            <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ServicesPreview
