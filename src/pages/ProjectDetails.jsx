import { Link, useParams } from 'react-router-dom'
import projects from '../data/projects.js'
import PageMetadata from '../components/seo/PageMetadata.jsx'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'

function ProjectDetails() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return (
      <>
        <PageMetadata
          title="Project Not Found | Code Craft Labs"
          description="This project does not have a public case study available."
          path={`/work/${slug}`}
          noIndex
        />
        <PageHeader
          eyebrow="Project details"
          title="This case study isn’t available."
          description="We only share project details that are confirmed and approved for publication."
        >
          <div className="page-header__actions">
            <Button to="/work">View work</Button>
            <Link className="text-link" to="/">
              Return home
            </Link>
          </div>
        </PageHeader>
      </>
    )
  }

  return (
    <>
      <PageMetadata
        title={`${project.title} | Code Craft Labs`}
        description={project.description}
        path={`/work/${project.slug}`}
      />
      <PageHeader
        eyebrow={project.category}
        title={project.title}
        description={project.description}
      />
      <section className="case-study section-padding">
        <Container>
          <img className="case-study__hero" src={project.image} alt={project.imageAlt} />
          <div className="case-study__grid">
            <div>
              <p className="eyebrow">Overview</p>
              <p>{project.overview}</p>
            </div>
            <div>
              <p className="eyebrow">Objective</p>
              <p>{project.objective}</p>
            </div>
            <div>
              <p className="eyebrow">Approach</p>
              <p>{project.approach}</p>
            </div>
            {project.challenges && (
              <div>
                <p className="eyebrow">Implementation notes</p>
                <p>{project.challenges}</p>
              </div>
            )}
            {project.results && (
              <div>
                <p className="eyebrow">Verified results</p>
                <p>{project.results}</p>
              </div>
            )}
            {project.technologies?.length > 0 && (
              <div>
                <p className="eyebrow">Technologies</p>
                <p>{project.technologies.join(' · ')}</p>
              </div>
            )}
          </div>
          <div className="case-study__actions">
            {project.liveUrl && (
              <Button href={project.liveUrl} variant="secondary" target="_blank" rel="noreferrer">
                Visit live project
              </Button>
            )}
            <Button to="/work">Back to work</Button>
          </div>
        </Container>
      </section>
    </>
  )
}

export default ProjectDetails
