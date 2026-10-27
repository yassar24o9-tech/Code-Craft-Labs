import { Helmet } from 'react-helmet-async'

const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/+$/, '')

function PageMetadata({ title, description, path = '/', noIndex = false }) {
  const canonical = configuredSiteUrl
    ? new URL(path, `${configuredSiteUrl}/`).toString()
    : null
  const structuredData = configuredSiteUrl
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${configuredSiteUrl}/#organization`,
            name: 'Code Craft Labs',
            url: `${configuredSiteUrl}/`,
            logo: `${configuredSiteUrl}/Code-Craft-Labs%20logo.jpeg`,
            slogan: 'BUILDING SOLUTIONS. CRAFTING FUTURES.',
          },
          {
            '@type': 'WebSite',
            '@id': `${configuredSiteUrl}/#website`,
            name: 'Code Craft Labs',
            url: `${configuredSiteUrl}/`,
            publisher: { '@id': `${configuredSiteUrl}/#organization` },
          },
        ],
      }
    : null

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Code Craft Labs" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {noIndex && <meta name="robots" content="noindex, follow" />}
      {canonical && <link rel="canonical" href={canonical} />}
      {canonical && <meta property="og:url" content={canonical} />}
      {canonical && (
        <meta
          property="og:image"
          content={`${configuredSiteUrl}/Code-Craft-Labs%20logo.jpeg`}
        />
      )}
      {canonical && (
        <meta
          name="twitter:image"
          content={`${configuredSiteUrl}/Code-Craft-Labs%20logo.jpeg`}
        />
      )}
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  )
}

export default PageMetadata
