import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function ServiceCard({ service, index }) {
  const Icon = service.icon

  return (
    <article className="service-card">
      <div className="service-card__topline">
        <span className="service-card__number">0{index + 1}</span>
        <Icon aria-hidden="true" className="service-card__icon" size={25} strokeWidth={1.5} />
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <ul className="service-card__examples">
        {service.examples.map((example) => (
          <li key={example}>{example}</li>
        ))}
      </ul>
      <Link className="service-card__link" to="/services">
        Explore service
        <ArrowUpRight aria-hidden="true" size={17} />
      </Link>
    </article>
  )
}

export default ServiceCard
