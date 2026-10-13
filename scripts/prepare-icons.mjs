import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const definitions = JSON.parse(
  await readFile(new URL('../core/registries/icons.json', import.meta.url), 'utf8')
)
const palette = JSON.parse(
  await readFile(new URL('../core/registries/mobilePalette.json', import.meta.url), 'utf8')
)
const metrics = JSON.parse(
  await readFile(new URL('./mobile-icon-metrics.json', import.meta.url), 'utf8')
)
const neutralDestination = new URL('../public/icons/shared/', import.meta.url)
const brandDestination = new URL('../public/icons/brand/', import.meta.url)
const stylesDestination = new URL('../styles/generated/', import.meta.url)
await Promise.all(
  [neutralDestination, brandDestination, stylesDestination].map((url) =>
    mkdir(url, { recursive: true })
  )
)

const rgb = (hex) =>
  hex
    .slice(1)
    .match(/../g)
    .map((part) => parseInt(part, 16))
const mix = (a, b, amount) =>
  rgb(a).map((channel, index) => Math.round(channel + (rgb(b)[index] - channel) * amount))
const hex = (channels) =>
  `#${channels.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
function themedColor(value, paint) {
  const named = { white: '#ffffff', black: '#000000' }
  let color = named[value] ?? value
  if (/^#[0-9a-f]{3}$/i.test(color))
    color = `#${color
      .slice(1)
      .split('')
      .map((channel) => channel + channel)
      .join('')}`
  if (!/^#[0-9a-f]{6}$/i.test(color)) return value
  const channels = rgb(color),
    light = (channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722) / 255
  if (paint === 'tile') {
    return light < 0.45
      ? hex(mix(palette.ganache, palette.powder, light * 0.65))
      : hex(mix(palette.powder, palette.butter, (light - 0.45) / 0.55))
  }
  return hex(mix(palette.ganache, palette.powder, (1 - light) * 0.42))
}

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
    ? definition.paint === 'tile'
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
  const brand = screen.replace(
    /\b(fill|stroke|stop-color)="([^"]+)"/g,
    (_, attribute, value) => `${attribute}="${themedColor(value, definition.paint)}"`
  )
  for (const [destination, svg] of [
    [neutralDestination, screen],
    [brandDestination, brand],
  ]) {
    await sharp(Buffer.from(svg))
      .resize({ width: 432, height: 432, fit: 'inside' })
      .png()
      .toFile(fileURLToPath(new URL(`${id}.png`, destination)))
    await writeFile(new URL(`${id}.svg`, destination), svg)
  }
}

const rgba = (color, alpha) => `rgba(${rgb(color).join(', ')}, ${alpha})`
const blend = (a, b, amount) => hex(mix(a, b, amount))
const css = `.palette {
  --mobile-butter: ${palette.butter};
  --mobile-powder: ${palette.powder};
  --mobile-berry: ${palette.berry};
  --mobile-ganache: ${palette.ganache};
  --mobile-canvas: var(--mobile-butter);
  --mobile-text: var(--mobile-ganache);
  --mobile-muted: ${blend(palette.ganache, palette.butter, 0.24)};
  --mobile-link: var(--mobile-berry);
  --mobile-surface: ${rgba(blend(palette.butter, '#ffffff', 0.58), 0.94)};
  --mobile-widget-material: linear-gradient(150deg, #ffffff78, #ffffff0a), ${rgba(palette.powder, 0.74)};
  --mobile-glass-shadow: inset 0 1px 0 #ffffffb8, inset 0 0 0 .5px ${rgba(palette.ganache, 0.13)}, 0 8px 22px ${rgba(palette.ganache, 0.07)};
  --mobile-line: ${rgba(palette.ganache, 0.14)};
  --mobile-media-ink: ${rgba(palette.butter, 0.85)};
  --mobile-media-shade: ${rgba(palette.ganache, 0.72)};
  --mobile-scrim: ${rgba(palette.ganache, 0.27)};
  --mobile-folder-tab: linear-gradient(${blend(palette.powder, palette.butter, 0.28)}, ${palette.powder});
  --mobile-folder-back: linear-gradient(${blend(palette.powder, palette.butter, 0.62)}, ${blend(palette.powder, '#ffffff', 0.3)});
  --mobile-folder-front: linear-gradient(150deg, ${blend(palette.powder, '#ffffff', 0.32)}, ${palette.powder});
  --mobile-folder-shadow: drop-shadow(0 6px 11px ${rgba(palette.ganache, 0.2)});
  --mobile-folder-elevated-shadow: drop-shadow(0 16px 26px ${rgba(palette.ganache, 0.28)});
  --mobile-folder-inset: inset 0 1.5px 0 #ffffffa6, inset 0 -3px 6px ${rgba(palette.ganache, 0.16)};
  --profile-text: var(--mobile-text);
  --profile-title: var(--mobile-text);
  --profile-muted: var(--mobile-muted);
  --profile-link: var(--mobile-link);
  --accent-blue: var(--mobile-berry);
  --accent-blue-hover: var(--mobile-ganache);
  color: var(--mobile-text);
  color-scheme: light;
}
`
await writeFile(new URL('mobile-palette.module.css', stylesDestination), css)
console.log(
  `Prepared ${Object.keys(definitions).length} shared Retina icons, mobile palette variants and scoped color tokens.`
)
