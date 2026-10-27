import { Link } from 'react-router-dom'
import projects from '../../data/projects.js'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import ProjectCard from './ProjectCard.jsx'

function ProjectGrid() {
  if (projects.length === 0) {
    return (
      <section className="project-list section-padding">
        <Container>
          <div className="project-empty">
            <p className="eyebrow">A considered start</p>
            <h2>Our public portfolio is still taking shape.</h2>
            <p>
              We only publish projects when the work and permission to share it are
              confirmed. If you have a project in mind, we&apos;d be glad to hear about
              it.
            </p>
            <Button to="/contact">Discuss your project</Button>
            <Link className="project-empty__back" to="/">
              Back to home
            </Link>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="project-list section-padding">
      <Container className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Container>
    </section>
  )
}

export default ProjectGrid
