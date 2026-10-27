import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import projects from '../../data/projects.js'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function SelectedWork() {
  return (
    <section className="work-section section-padding" aria-labelledby="work-title">
      <Container>
        <div className="work-section__heading">
          <SectionHeading
            id="work-title"
            eyebrow="Selected work"
            title="Made with intention."
            description="A small collection of digital experiences, shaped around real needs."
          />
          {projects.length > 0 && (
            <Button to="/work" variant="secondary">
              View all work
              <ArrowUpRight aria-hidden="true" size={17} />
            </Button>
          )}
        </div>

        {projects.length > 0 ? (
          <div className="work-section__grid">
            {projects.map((project) => (
              <Link
                className="work-teaser"
                key={project.slug}
                to={`/work/${project.slug}`}
              >
                <img src={project.image} alt={project.imageAlt} loading="lazy" />
                <div>
                  <p className="eyebrow">{project.category}</p>
                  <h3>{project.title}</h3>
                </div>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="work-empty">
            <span className="work-empty__index" aria-hidden="true">
              01
            </span>
            <div>
              <p className="eyebrow">Portfolio in progress</p>
              <h3>Good work deserves a real story.</h3>
              <p>
                We&apos;re preparing projects that can be shared publicly. Until then,
                we&apos;d be glad to hear what you&apos;re looking to build.
              </p>
            </div>
            <Button to="/contact" variant="secondary">
              Discuss a project
            </Button>
          </div>
        )}
      </Container>
    </section>
  )
}

export default SelectedWork
