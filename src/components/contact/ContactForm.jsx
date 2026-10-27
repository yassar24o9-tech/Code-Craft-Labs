import { useState } from 'react'
import { Send } from 'lucide-react'
import Button from '../ui/Button.jsx'

const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '/api/contact'
const formEnabled = import.meta.env.VITE_CONTACT_FORM_ENABLED !== 'false'

function ContactForm() {
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [startedAt] = useState(() => Date.now())

  async function handleSubmit(event) {
    event.preventDefault()
    if (!formEnabled || status.type === 'submitting') return

    const form = event.currentTarget
    const formData = new FormData(form)
    const inquiry = {
      name: formData.get('name').trim(),
      organization: formData.get('organization').trim(),
      email: formData.get('email').trim(),
      projectType: formData.get('projectType'),
      budget: formData.get('budget'),
      description: formData.get('description').trim(),
      website: formData.get('website'),
      startedAt,
    }

    setStatus({ type: 'submitting', message: 'Sending your project inquiry…' })

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        throw new Error(result?.error || 'Your inquiry could not be sent. Please try again later.')
      }

      form.reset()
      setStatus({
        type: 'success',
        message: 'Your inquiry has been sent. Thank you—we’ll be in touch.',
      })
    } catch (error) {
      console.error('Contact form submission failed.', error)
      setStatus({
        type: 'error',
        message:
          error instanceof TypeError
            ? 'We couldn’t reach the inquiry service. Please try again later.'
            : error.message,
      })
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {!formEnabled && (
        <p className="form-notice" role="status">
          Online submissions are not enabled yet. Please use a configured email or
          WhatsApp contact, or try again after the inquiry service is set up.
        </p>
      )}

      <div className="contact-form__grid">
        <label className="form-field">
          <span>Name <span aria-hidden="true">*</span></span>
          <input autoComplete="name" maxLength="120" name="name" required />
        </label>
        <label className="form-field">
          <span>Business or organization</span>
          <input autoComplete="organization" maxLength="160" name="organization" />
        </label>
        <label className="form-field">
          <span>Email <span aria-hidden="true">*</span></span>
          <input
            autoComplete="email"
            maxLength="254"
            name="email"
            required
            type="email"
          />
        </label>
        <label className="form-field">
          <span>Project type <span aria-hidden="true">*</span></span>
          <select name="projectType" required defaultValue="">
            <option value="" disabled>Select a project type</option>
            <option value="Website development">Website development</option>
            <option value="Web application">Web application</option>
            <option value="AI-powered solution">AI-powered solution</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </label>
        <label className="form-field">
          <span>Budget range <span className="form-field__optional">Optional</span></span>
          <select name="budget" defaultValue="">
            <option value="">Prefer not to say</option>
            <option value="Under INR 50,000">Under ₹50,000</option>
            <option value="INR 50,000–150,000">₹50,000–₹1,50,000</option>
            <option value="INR 150,000–500,000">₹1,50,000–₹5,00,000</option>
            <option value="Over INR 500,000">Over ₹5,00,000</option>
            <option value="To be discussed">To be discussed</option>
          </select>
        </label>
        <label className="form-field form-field--full">
          <span>Tell us about your project <span aria-hidden="true">*</span></span>
          <textarea
            maxLength="5000"
            minLength="20"
            name="description"
            required
            rows="6"
          />
        </label>
      </div>

      <label className="contact-form__honeypot" aria-hidden="true">
        Leave this field empty
        <input
          autoComplete="off"
          name="website"
          tabIndex="-1"
          type="text"
        />
      </label>

      <div className="contact-form__submit">
        <Button disabled={!formEnabled || status.type === 'submitting'} type="submit">
          {status.type === 'submitting' ? 'Sending…' : 'Send inquiry'}
          <Send aria-hidden="true" size={16} />
        </Button>
        <p>We&apos;ll only use these details to respond to your inquiry.</p>
      </div>

      {status.message && (
        <p className={`form-status form-status--${status.type}`} role="status" aria-live="polite">
          {status.message}
        </p>
      )}
    </form>
  )
}

export default ContactForm
