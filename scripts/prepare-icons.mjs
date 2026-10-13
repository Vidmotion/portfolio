import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'

const source = new URL('../public/icons/SVG/', import.meta.url)
const destination = new URL('../public/icons/ui/', import.meta.url)
await mkdir(destination, { recursive: true })

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
}
console.log(`Prepared ${names.length} screen SVGs from the original icon set.`)
