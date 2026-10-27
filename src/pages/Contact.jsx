import { Mail, MessageCircle } from 'lucide-react'
import PageMetadata from '../components/seo/PageMetadata.jsx'
import ContactForm from '../components/contact/ContactForm.jsx'
import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() || 'yassartech54@gmail.com'
const configuredWhatsAppNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.trim()
const whatsappNumber = (configuredWhatsAppNumber || '919103609657').replace(/\D/g, '')
const whatsappUrl =
  whatsappNumber && /^\d{8,15}$/.test(whatsappNumber)
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Code Craft Labs, I would like to discuss a project.')}`
    : null

function Contact() {
  return (
    <>
      <PageMetadata
        title="Start a Project | Contact Code Craft Labs"
        description="Tell Code Craft Labs about your website, web application, or AI-powered solution project."
        path="/contact"
      />
      <PageHeader
        eyebrow="Start a conversation"
        title="Have an idea worth building?"
        description="Share a little about what you need. We’ll use your information only to respond to your inquiry."
      />
      <section className="contact-page section-padding">
        <Container className="contact-page__layout">
          <aside className="contact-options">
            <p className="eyebrow">Contact options</p>
            <h2>Let&apos;s talk through what you have in mind.</h2>
            <p>
              A few details about your goals and timeline can help us have a more
              useful first conversation.
            </p>
            <div className="contact-options__links">
              {contactEmail ? (
                <a href={`mailto:${contactEmail}`}>
                  <Mail aria-hidden="true" size={19} />
                  <span>
                    <small>Email</small>
                    {contactEmail}
                  </span>
                </a>
              ) : (
                <p className="contact-unconfigured">
                  Business email will appear here once configured.
                </p>
              )}
              {whatsappUrl ? (
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle aria-hidden="true" size={19} />
                  <span>
                    <small>WhatsApp</small>
                    Message +91 91036 09657
                  </span>
                </a>
              ) : (
                <p className="contact-unconfigured">
                  WhatsApp contact will appear here once a business number is configured.
                </p>
              )}
            </div>
          </aside>
          <div className="contact-form-wrap">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  )
}

export default Contact
