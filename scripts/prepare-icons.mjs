import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const definitions = JSON.parse(
  await readFile(new URL('../core/registries/icons.json', import.meta.url), 'utf8')
)
const metrics = JSON.parse(
  await readFile(new URL('./mobile-icon-metrics.json', import.meta.url), 'utf8')
)
const neutralDestination = new URL('../public/icons/shared/', import.meta.url)
await mkdir(neutralDestination, { recursive: true })

for (const [id, definition] of Object.entries(definitions)) {
  const sourceFolder =
    definition.family === 'social' ? '../public/icons/social/' : '../public/icons/SVG/'
  const original = await readFile(
    new URL(`${sourceFolder}${encodeURIComponent(definition.source)}`, import.meta.url),
    'utf8'
  )
  // Carlo's editable masters and all vector paths remain unchanged.
  let screen = original
    .replaceAll('shape-rendering="crispEdges"', 'shape-rendering="auto"')
    .replace(/<foreignObject\b[\s\S]*?<\/foreignObject>/g, '')
  if (definition.source === 'video.svg') {
    screen = screen
      .replace(
        '<defs>',
        '<defs><linearGradient id="screen-camera-silver" x1="0" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse"><stop stop-color="#efeff2"/><stop offset="1" stop-color="#b4b6bd"/></linearGradient>'
      )
      .replace(
        '<g data-figma-bg-blur-radius="2">',
        '<g data-figma-bg-blur-radius="2" fill="url(#screen-camera-silver)">'
      )
  }
  const optical = metrics[definition.source]
  const matchesMaster =
    optical && createHash('sha256').update(original).digest('hex') === optical.sourceHash
  const viewBox = matchesMaster
    ? definition.edgeToEdge
      ? optical.original
      : optical.mobile
    : screen.match(/viewBox="([^"]+)"/)?.[1]
  if (!viewBox) throw new Error(`Missing viewBox for ${id}`)
  const [, , width, height] = viewBox.split(' ').map(Number)
  // Set vector render size before rasterizing: resizing a tiny raster afterward is blurry.
  const renderScale = 864 / Math.max(width, height)
  screen = screen.replace(/<svg\b([^>]*)>/, (_, attributes) => {
    const cleaned = attributes.replace(/\s+(width|height|viewBox)="[^"]*"/g, '')
    return `<svg${cleaned} width="${width * renderScale}" height="${height * renderScale}" viewBox="${viewBox}">`
  })
  await sharp(Buffer.from(screen))
    .resize({ width: 432, height: 432, fit: 'inside' })
    .png()
    .toFile(fileURLToPath(new URL(`${id}.png`, neutralDestination)))
  await writeFile(new URL(`${id}.svg`, neutralDestination), screen)
}
console.log(
  `Prepared ${Object.keys(definitions).length} shared Retina icons from the original SVGs.`
)
