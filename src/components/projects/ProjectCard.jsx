import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <Link className="project-card__image" to={`/work/${project.slug}`}>
        <img src={project.image} alt={project.imageAlt} loading="lazy" />
        <span className="project-card__open" aria-hidden="true">
          <ArrowUpRight size={20} />
        </span>
      </Link>
      <div className="project-card__details">
        <div>
          <p className="eyebrow">{project.category}</p>
          <h2>
            <Link to={`/work/${project.slug}`}>{project.title}</Link>
          </h2>
          <p>{project.description}</p>
          {project.technologies?.length > 0 && (
            <ul className="project-card__technologies" aria-label="Technologies">
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          )}
        </div>
        {project.liveUrl && (
          <a
            className="project-card__live"
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            Visit project <ExternalLink aria-hidden="true" size={16} />
          </a>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
