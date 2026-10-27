import PageMetadata from '../components/seo/PageMetadata.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import ProjectGrid from '../components/projects/ProjectGrid.jsx'

function Work() {
  return (
    <>
      <PageMetadata
        title="Selected Projects | Code Craft Labs"
        description="Explore selected digital work from Code Craft Labs. Projects are shared only when their details and permission are confirmed."
        path="/work"
      />
      <PageHeader
        eyebrow="Selected work"
        title="Work shaped around real needs."
        description="We value useful outcomes and honest stories. Our public case studies will appear here as projects and permission to share them are confirmed."
      />
      <ProjectGrid />
    </>
  )
}

export default Work
