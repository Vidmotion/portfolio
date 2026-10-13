import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const source = new URL('../public/icons/SVG/', import.meta.url)
const destination = new URL('../public/icons/ui/', import.meta.url)
await mkdir(destination, { recursive: true })
const mobileDestination = new URL('../public/icons/mobile/', import.meta.url)
await mkdir(mobileDestination, { recursive: true })
const metrics = JSON.parse(
  await readFile(new URL('./mobile-icon-metrics.json', import.meta.url), 'utf8')
)

const names = (await readdir(source)).filter((name) => name.endsWith('.svg')).sort()
for (const name of names) {
  const original = await readFile(new URL(encodeURIComponent(name), source), 'utf8')
  // Keep Carlo's paths, fills, gradients, filters and original files unchanged.
  // Let the browser antialias curves when the glyph scales for different screens.
  const screenVersion = original.replaceAll(
    'shape-rendering="crispEdges"',
    'shape-rendering="auto"'
  )
  await writeFile(new URL(encodeURIComponent(name), destination), screenVersion)
  // Figma's embedded HTML backdrop layers are not portable app glyphs.
  // Mobile copies retain every vector path, gradient and SVG shadow.
  let mobileVersion = screenVersion.replace(/<foreignObject\b[\s\S]*?<\/foreignObject>/g, '')
  const opticalBox = metrics[name]
  if (opticalBox && createHash('sha256').update(original).digest('hex') === opticalBox.sourceHash) {
    const [, , width, height] = opticalBox.mobile.split(' ')
    // Give the Retina export ample source resolution without changing the viewBox.
    const retinaScale = 512 / Math.max(Number(width), Number(height))
    mobileVersion = mobileVersion.replace(/<svg\b([^>]*)>/, (_, attributes) => {
      const cleaned = attributes.replace(/\s+(width|height|viewBox)="[^"]*"/g, '')
      return `<svg${cleaned} width="${Number(width) * retinaScale}" height="${Number(height) * retinaScale}" viewBox="${opticalBox.mobile}">`
    })
  }
  await writeFile(new URL(encodeURIComponent(name), mobileDestination), mobileVersion)
  // WebKit's SVG filter rendering differs from Chromium on Retina displays.
  // Export author-owned vectors once at 4x the largest mobile tile (66px).
  // The original SVGs remain the editable masters; no runtime rasterization is needed.
  await sharp(Buffer.from(mobileVersion), { density: 144 })
    .resize({ width: 264, height: 264, fit: 'inside' })
    .png()
    .toFile(fileURLToPath(new URL(encodeURIComponent(name.replace(/\.svg$/, '.png')), mobileDestination)))
}
console.log(`Prepared ${names.length} screen SVGs and mobile Retina exports from the original icon set.`)
