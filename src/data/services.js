import { BrainCircuit, Code2, PanelsTopLeft } from 'lucide-react'

const services = [
  {
    slug: 'website-development',
    title: 'Website development',
    icon: PanelsTopLeft,
    description:
      'Clear, responsive websites that help people understand your business and take the next step.',
    examples: ['Business websites', 'School websites', 'Landing pages'],
    longDescription:
      'Plan and build a responsive website that makes your organization easier to understand and reach.',
    audience:
      'Local businesses, schools, service providers, startups, and organizations that need a clear, dependable web presence.',
    problems:
      'Outdated information, difficult mobile experiences, unclear services, or a website that no longer reflects the organization.',
    deliverables: [
      'Content and page structure',
      'Responsive interface design',
      'Frontend development',
      'Launch checks and handover',
    ],
    process:
      'We agree on goals and content, map the key pages, design the experience, build it responsively, and test it before launch.',
  },
  {
    slug: 'web-application-development',
    title: 'Web application development',
    icon: Code2,
    description:
      'Purpose-built online tools and workflows shaped around how your organization works.',
    examples: ['Interactive applications', 'Business dashboards', 'Custom workflows'],
    longDescription:
      'Create a browser-based application to bring a specific workflow, information, or online tool into one useful place.',
    audience:
      'Teams and growing organizations with a defined digital workflow or tool that would benefit from a custom web experience.',
    problems:
      'Manual repeat tasks, disconnected steps, or a need for a tailored interface beyond a standard informational website.',
    deliverables: [
      'Requirements and workflow mapping',
      'Application interface',
      'Frontend implementation',
      'Integration planning and testing',
    ],
    process:
      'We first define the users and workflow, then shape a practical scope, build the interface and agreed functionality, and test the result.',
  },
  {
    slug: 'ai-powered-solutions',
    title: 'AI-powered solutions',
    icon: BrainCircuit,
    description:
      'Practical AI integrations and intelligent features that support useful digital experiences.',
    examples: ['AI integrations', 'Workflow automation', 'Intelligent web features'],
    longDescription:
      'Integrate AI capabilities where they can support a clear user need or reduce a repetitive part of a digital workflow.',
    audience:
      'Organizations with a specific use case where an AI feature can complement—not obscure—their existing service or product.',
    problems:
      'Repetitive information tasks or product experiences that could benefit from a carefully scoped intelligent feature.',
    deliverables: [
      'Use-case and feasibility discussion',
      'AI feature planning',
      'Integration implementation',
      'Testing and responsible-use considerations',
    ],
    process:
      'We clarify the use case and constraints, select an appropriate integration approach, build a focused feature, and test its behavior before release.',
  },
]

export default services
