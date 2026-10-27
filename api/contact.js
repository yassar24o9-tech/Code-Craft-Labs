import { env } from 'node:process'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const allowedProjectTypes = new Set([
  'Website development',
  'Web application',
  'AI-powered solution',
  'Not sure yet',
])
const allowedBudgets = new Set([
  '',
  'Under INR 50,000',
  'INR 50,000–150,000',
  'INR 150,000–500,000',
  'Over INR 500,000',
  'To be discussed',
])

function respond(res, status, body) {
  return res.status(status).json(body)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return respond(res, 405, { error: 'Method not allowed.' })
  }

  const {
    name,
    organization = '',
    email,
    projectType,
    budget = '',
    description,
    website = '',
    startedAt,
  } = req.body ?? {}

  if (typeof website !== 'string' || website.trim()) {
    return respond(res, 400, { error: 'Invalid form submission.' })
  }

  const elapsed = Date.now() - Number(startedAt)
  if (!Number.isFinite(elapsed) || elapsed < 2000 || elapsed > 30 * 60 * 1000) {
    return respond(res, 400, { error: 'Please review the form and submit it again.' })
  }

  if (
    typeof name !== 'string' ||
    name.trim().length < 1 ||
    name.trim().length > 120 ||
    typeof organization !== 'string' ||
    organization.length > 160 ||
    typeof email !== 'string' ||
    email.length > 254 ||
    !emailPattern.test(email.trim()) ||
    !allowedProjectTypes.has(projectType) ||
    !allowedBudgets.has(budget) ||
    typeof description !== 'string' ||
    description.trim().length < 20 ||
    description.length > 5000
  ) {
    return respond(res, 400, { error: 'Please check the required form fields and try again.' })
  }

  const apiKey = env.RESEND_API_KEY
  const recipient = env.CONTACT_TO_EMAIL || 'yassartech54@gmail.com'
  const sender = env.CONTACT_FROM_EMAIL

  if (!apiKey || !recipient || !sender) {
    return respond(res, 503, {
      error: `Online submissions aren't configured yet. Please email ${recipient} directly.`,
    })
  }

  const text = [
    'New project inquiry — Code Craft Labs',
    '',
    `Name: ${name.trim()}`,
    `Business or organization: ${organization.trim() || 'Not provided'}`,
    `Email: ${email.trim()}`,
    `Project type: ${projectType}`,
    `Budget range: ${budget || 'Not provided'}`,
    '',
    'Project description:',
    description.trim(),
  ].join('\n')

  const subjectName = name.trim().replace(/[\r\n]+/g, ' ')
  let delivery
  try {
    delivery = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email.trim(),
        subject: `Project inquiry: ${subjectName}`,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    })
  } catch (error) {
    console.error('Contact email provider could not be reached.', error)
    return respond(res, 502, { error: 'The inquiry could not be delivered. Please try again later.' })
  }

  if (!delivery.ok) {
    console.error('Contact email provider rejected the inquiry.', {
      status: delivery.status,
    })
    return respond(res, 502, { error: 'The inquiry could not be delivered. Please try again later.' })
  }

  return respond(res, 200, { success: true })
}
