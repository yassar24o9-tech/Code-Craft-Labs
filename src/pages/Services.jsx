import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import services from '../data/services.js'
import PageMetadata from '../components/seo/PageMetadata.jsx'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'

function Services() {
  return (
    <>
      <PageMetadata
        title="Web Development & AI Solutions | Code Craft Labs"
        description="Website development, custom web applications, and practical AI-powered solutions designed around your organization’s needs."
        path="/services"
      />
      <PageHeader
        eyebrow="Services"
        title="Digital solutions, built with purpose."
        description="We help organizations turn ideas and everyday challenges into thoughtful digital experiences."
      >
        <Button to="/contact">Talk through your project</Button>
      </PageHeader>
      <section className="service-details section-padding">
        <Container>
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <article className="service-detail" id={service.slug} key={service.slug}>
                <div className="service-detail__aside">
                  <span>0{index + 1}</span>
                  <Icon aria-hidden="true" size={28} strokeWidth={1.4} />
                </div>
                <div className="service-detail__body">
                  <h2>{service.title}</h2>
                  <p className="service-detail__lead">{service.longDescription}</p>
                  <div className="service-detail__columns">
                    <div>
                      <h3>Who it helps</h3>
                      <p>{service.audience}</p>
                    </div>
                    <div>
                      <h3>What it can address</h3>
                      <p>{service.problems}</p>
                    </div>
                    <div>
                      <h3>Typical deliverables</h3>
                      <ul>
                        {service.deliverables.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h3>Relevant examples</h3>
                      <ul>
                        {service.examples.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h3>How we approach it</h3>
                      <p>{service.process}</p>
                    </div>
                  </div>
                  <Link className="text-link" to="/contact">
                    Ask about this service
                    <ArrowUpRight aria-hidden="true" size={17} />
                  </Link>
                </div>
              </article>
            )
          })}
        </Container>
      </section>
    </>
  )
}

export default Services
