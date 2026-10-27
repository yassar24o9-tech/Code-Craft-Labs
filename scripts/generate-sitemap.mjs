import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { loadEnv } from 'vite'
import projects from '../src/data/projects.js'

const env = loadEnv('production', process.cwd(), 'VITE_')
const siteUrl = env.VITE_SITE_URL?.trim().replace(/\/+$/, '')
const outputDirectory = resolve('dist')
const routes = [
  '/',
  '/work',
  '/services',
  '/about',
  '/contact',
  ...projects.map((project) => `/work/${project.slug}`),
]

await mkdir(outputDirectory, { recursive: true })

if (!siteUrl) {
  console.warn(
    'VITE_SITE_URL is unset; sitemap generation is deferred until the production domain is configured.',
  )
  await writeFile(
    resolve(outputDirectory, 'robots.txt'),
    'User-agent: *\nAllow: /\n',
  )
  process.exit(0)
}

let parsedSiteUrl
try {
  parsedSiteUrl = new URL(siteUrl)
} catch {
  throw new Error('VITE_SITE_URL must be a valid absolute URL.')
}

if (parsedSiteUrl.protocol !== 'https:') {
  throw new Error('VITE_SITE_URL must use HTTPS for production.')
}

if (
  parsedSiteUrl.pathname !== '/' ||
  parsedSiteUrl.search ||
  parsedSiteUrl.hash ||
  parsedSiteUrl.username ||
  parsedSiteUrl.password
) {
  throw new Error(
    'VITE_SITE_URL must be the HTTPS origin without a path, query, or fragment.',
  )
}

const urls = routes
  .map((route) => `  <url><loc>${new URL(route, `${siteUrl}/`).toString()}</loc></url>`)
  .join('\n')

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urls,
  '</urlset>',
  '',
].join('\n')

await writeFile(resolve(outputDirectory, 'sitemap.xml'), sitemap)
await writeFile(
  resolve(outputDirectory, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
)

console.info(`Generated sitemap.xml for ${siteUrl}`)
