'use client'

import { useEffect } from 'react'

type Sample = { pixels: Uint8ClampedArray; width: number; height: number }
const samples = new Map<string, Sample>()
const luminance = (color: number[]) =>
  color
    .map((value) => {
      const c = value / 255
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    })
    .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0)

function sampleImage(image: HTMLImageElement): Sample | undefined {
  if (!image.complete || !image.naturalWidth) return
  const key = image.currentSrc || image.src
  const saved = samples.get(key)
  if (saved) return saved
  try {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 96
    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) return
    context.drawImage(image, 0, 0, 96, 96)
    const sample = {
      pixels: context.getImageData(0, 0, 96, 96).data,
      width: image.naturalWidth,
      height: image.naturalHeight,
    }
    if (samples.size >= 8) samples.delete(samples.keys().next().value!)
    samples.set(key, sample)
    return sample
  } catch {
    // Keep the theme's readable fallback if this browser cannot sample an image.
  }
}

/** Sample a tiny cached image locally; never upload a wallpaper or process full-size pixels. */
export function useWallpaperLabels(textColor: string, opacity: number) {
  useEffect(() => {
    let frame = 0
    let settled = 0
    let movingParents = new Set<Element>()
    const update = () => {
      const parents = new Set<Element>()
      const groups = new Map<Element, { labels: HTMLElement[]; luminance: number }>()
      const labels = document.querySelectorAll<HTMLElement>('[data-wallpaper-label]')
      for (const label of labels) {
        if (label.closest('[inert], [aria-hidden="true"]') || !label.getClientRects().length)
          continue
        if (label.parentElement) parents.add(label.parentElement)
        const surface = label.closest('[data-wallpaper-surface]')
        const layer = surface?.querySelector<HTMLElement>('[data-wallpaper-image]')
        const image = layer?.querySelector<HTMLImageElement>('img')
        if (!layer || !image) continue
        const sample = sampleImage(image)
        if (!sample) continue
        const backdrop = layer.getBoundingClientRect()
        const range = document.createRange()
        range.selectNodeContents(label)
        const rect = range.getBoundingClientRect()
        if (!backdrop.width || !backdrop.height || !rect.width || !rect.height) continue
        const scale = Math.max(backdrop.width / sample.width, backdrop.height / sample.height)
        const paintedWidth = sample.width * scale
        const paintedHeight = sample.height * scale
        const cropX = (paintedWidth - backdrop.width) / 2
        const cropY = (paintedHeight - backdrop.height) / 2
        const background = getComputedStyle(layer.parentElement!)
          .backgroundColor.match(/[\d.]+/g)
          ?.slice(0, 3)
          .map(Number) ?? [247, 249, 252]
        let average = 0
        // Match object-fit:cover at the label's actual position, including dragged folders.
        for (let y = 0; y < 3; y++) {
          for (let x = 0; x < 5; x++) {
            const u =
              (rect.left + rect.width * ((x + 0.5) / 5) - backdrop.left + cropX) / paintedWidth
            const v =
              (rect.top + rect.height * ((y + 0.5) / 3) - backdrop.top + cropY) / paintedHeight
            const px = Math.max(0, Math.min(95, Math.floor(u * 96)))
            const py = Math.max(0, Math.min(95, Math.floor(v * 96)))
            const index = (py * 96 + px) * 4
            average +=
              luminance(
                [0, 1, 2].map(
                  (i) => sample.pixels[index + i] * opacity + background[i] * (1 - opacity)
                )
              ) / 15
          }
        }
        // Mobile app grids share one contrast decision so adjacent labels stay consistent.
        // Other labels still adapt independently, including draggable desktop folders.
        const key = label.closest('[data-wallpaper-label-group]') ?? label
        const group = groups.get(key) ?? { labels: [], luminance: 0 }
        group.labels.push(label)
        group.luminance += average
        groups.set(key, group)
      }
      for (const group of groups.values()) {
        const average = group.luminance / group.labels.length
        const dark = '#17202a'
        const useLight =
          1.05 / (average + 0.05) > (average + 0.05) / (luminance([23, 32, 42]) + 0.05)
        const color = textColor === 'auto' ? (useLight ? '#ffffff' : dark) : textColor
        const lightText =
          luminance([1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16))) > 0.45
        const shadow = lightText
          ? '0 1px 2px rgba(0,0,0,.8),0 0 4px rgba(0,0,0,.6)'
          : '0 1px 2px rgba(255,255,255,.85),0 0 4px rgba(255,255,255,.65)'
        for (const label of group.labels) {
          if (label.style.getPropertyValue('--wallpaper-label-color') !== color)
            label.style.setProperty('--wallpaper-label-color', color)
          if (label.style.getPropertyValue('--wallpaper-label-shadow') !== shadow)
            label.style.setProperty('--wallpaper-label-shadow', shadow)
        }
      }
      if (parents.size !== movingParents.size || [...parents].some((p) => !movingParents.has(p))) {
        positionObserver.disconnect()
        movingParents = parents
        for (const parent of parents)
          positionObserver.observe(parent, { attributes: true, attributeFilter: ['style'] })
      }
    }
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    const settle = () => {
      schedule()
      clearTimeout(settled)
      settled = window.setTimeout(schedule, 650)
    }
    const observer = new MutationObserver(schedule)
    const positionObserver = new MutationObserver(schedule)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-hidden', 'inert', 'src', 'srcset'],
    })
    const themeObserver = new MutationObserver(settle)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'data-wallpaper', 'data-appearance'],
    })
    window.addEventListener('load', schedule, true)
    window.addEventListener('resize', settle)
    window.addEventListener('pointerup', settle, true)
    document.addEventListener('scroll', schedule, true)
    settle()
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(settled)
      observer.disconnect()
      positionObserver.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('load', schedule, true)
      window.removeEventListener('resize', settle)
      window.removeEventListener('pointerup', settle, true)
      document.removeEventListener('scroll', schedule, true)
    }
  }, [textColor, opacity])
}
