import ContactCTA from '../components/home/ContactCTA.jsx'
import Hero from '../components/home/Hero.jsx'
import ProcessSection from '../components/home/ProcessSection.jsx'
import SelectedWork from '../components/home/SelectedWork.jsx'
import ServicesPreview from '../components/home/ServicesPreview.jsx'
import TrustSection from '../components/home/TrustSection.jsx'
import WhyChooseUs from '../components/home/WhyChooseUs.jsx'
import PageMetadata from '../components/seo/PageMetadata.jsx'

function Home() {
  return (
    <>
      <PageMetadata
        title="Code Craft Labs | Website Development & Digital Solutions"
        description="Code Craft Labs designs and builds modern websites, web applications, and practical AI-powered solutions for businesses and organizations."
      />
      <Hero />
      <TrustSection />
      <SelectedWork />
      <ServicesPreview />
      <WhyChooseUs />
      <ProcessSection />
      <ContactCTA />
    </>
  )
}

export default Home
