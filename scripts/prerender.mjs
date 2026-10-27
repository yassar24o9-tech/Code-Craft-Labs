import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { StaticRouter } from 'react-router'
import { createServer } from 'vite'

const outputDirectory = resolve('dist')
const vite = await createServer({
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
})

try {
  const [{ default: AppRoutes }, { default: projects }] = await Promise.all([
    vite.ssrLoadModule('/src/AppRoutes.jsx'),
    vite.ssrLoadModule('/src/data/projects.js'),
  ])
  const template = await readFile(resolve(outputDirectory, 'index.html'), 'utf8')
  const routes = [
    '/',
    '/work',
    '/services',
    '/about',
    '/contact',
    ...projects.map((project) => `/work/${project.slug}`),
  ]

  for (const route of routes) {
    const app = createElement(
      HelmetProvider,
      null,
      createElement(
        StaticRouter,
        { location: route },
        createElement(AppRoutes),
      ),
    )
    const appHtml = renderToString(app)
    const metadataPattern =
      /<(?:title|script)\b[^>]*>[\s\S]*?<\/(?:title|script)>|<(?:meta|link)\b[^>]*\/?>/g
    const headMarkup = [...appHtml.matchAll(metadataPattern)]
      .map(([tag]) => tag)
      .join('\n    ')
    const appMarkup = appHtml.replace(metadataPattern, '')

    if (!headMarkup.includes('<title') || !headMarkup.includes('name="description"')) {
      throw new Error(`Page metadata was not rendered for ${route}.`)
    }

    const html = template
      .replace('</head>', `    ${headMarkup}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${appMarkup}</div>`)

    if (html === template || !html.includes(`<div id="root">${appMarkup}</div>`)) {
      throw new Error(`Could not prerender the application shell for ${route}.`)
    }

    const relativePath = route === '/' ? '' : route.slice(1)
    const routeDirectory = resolve(outputDirectory, relativePath)
    await mkdir(routeDirectory, { recursive: true })
    await writeFile(resolve(routeDirectory, 'index.html'), html)
  }

  console.info(`Prerendered ${routes.length} public route(s).`)
} finally {
  await vite.close()
}
