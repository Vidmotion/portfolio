'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { Check, Sun, Moon, Upload, RotateCcw, LoaderCircle, Trash2 } from 'lucide-react'
import { useDesktopStore } from '@/store/desktopStore'
import { useCustomWallpaperStore } from '@/store/customWallpaperStore'
import { useLocaleStore } from '@/store/localeStore'
import { wallpapers, getWallpaper } from '@/core/registries/wallpapers'
import { colorContrast, mixWithWhite } from '@/lib/appearance'
import styles from './AppearanceSettings.module.css'

export function AppearanceSettings() {
  const {
    wallpaper,
    setWallpaper,
    iconColor,
    setIconColor,
    appearance,
    setAppearance,
    resetAppearance,
    customWallpaperEnabled,
    setCustomWallpaperEnabled,
  } = useDesktopStore()
  const custom = useCustomWallpaperStore(),
    it = useLocaleStore((s) => s.locale) === 'it'
  const [error, setError] = useState(''),
    input = useRef<HTMLInputElement>(null)
  const dark = appearance.mode === 'dark',
    theme = getWallpaper(wallpaper)
  const accent = customWallpaperEnabled && custom.url ? custom.accent : theme.accent
  const surface =
    appearance.surfaceColor === 'auto'
      ? dark
        ? '#172235'
        : mixWithWhite(accent, 0.96)
      : appearance.surfaceColor
  const ink =
    appearance.textColor === 'auto' ? (dark ? '#f2f5fb' : theme.ink) : appearance.textColor
  const glyph = iconColor === 'auto' ? (dark ? mixWithWhite(accent, 0.76) : accent) : iconColor
  const lowContrast =
    colorContrast(ink, surface) < 4.5 ||
    colorContrast(glyph, surface) < 3 ||
    appearance.iconOpacity < 0.6 ||
    (appearance.surfaceOpacity !== null && appearance.surfaceOpacity < 0.3)
  async function upload(file?: File) {
    if (!file || custom.busy) return
    setError('')
    try {
      await custom.upload(file)
      setCustomWallpaperEnabled(true)
    } catch (reason) {
      const code = reason instanceof Error ? reason.message : ''
      setError(
        code === 'decode'
          ? it
            ? 'Il file non è un’immagine leggibile. Prova a esportarlo di nuovo in JPG, PNG, WebP o AVIF.'
            : 'This file is not a readable image. Try exporting it again as JPG, PNG, WebP or AVIF.'
          : code === 'size'
            ? it
              ? 'Questa immagine è troppo grande. Scegli un file fino a 20 MB o riducine le dimensioni.'
              : 'This image is too large. Choose a file up to 20 MB or reduce its dimensions.'
            : code === 'format'
              ? it
                ? 'Scegli un’immagine JPG, PNG, WebP o AVIF.'
                : 'Choose a JPG, PNG, WebP or AVIF image.'
              : it
                ? 'Non riesco a salvare lo sfondo in questo browser. Riprova.'
                : 'Could not save the wallpaper in this browser. Please try again.'
      )
    } finally {
      if (input.current) input.current.value = ''
    }
  }
  return (
    <div className={styles.appearance}>
      <div className={styles.wallpapers} role="group" aria-label={it ? 'Sfondo' : 'Wallpaper'}>
        {wallpapers.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={`${it ? 'Sfondo' : 'Wallpaper'} ${i + 1}`}
            aria-pressed={!customWallpaperEnabled && wallpaper === item.id}
            onClick={() => setWallpaper(item.id)}
          >
            <Image
              src={item.thumbnail}
              alt=""
              fill
              sizes="(max-width:600px) 45vw,160px"
              unoptimized
            />
            {!customWallpaperEnabled && wallpaper === item.id && (
              <span className={styles.check}>
                <Check size={14} strokeWidth={3} />
              </span>
            )}
          </button>
        ))}
      </div>
      <div className={styles.uploadRow}>
        {custom.url && (
          <button
            type="button"
            className={styles.personalThumb}
            onClick={() => setCustomWallpaperEnabled(true)}
            aria-label={it ? 'Usa il mio sfondo' : 'Use my wallpaper'}
            aria-pressed={customWallpaperEnabled}
            style={{ backgroundImage: `url("${custom.url}")` }}
          >
            {customWallpaperEnabled && <Check size={16} />}
          </button>
        )}
        <button
          type="button"
          className={styles.upload}
          onClick={() => input.current?.click()}
          disabled={custom.busy}
        >
          {custom.busy ? <LoaderCircle size={16} /> : <Upload size={16} />}{' '}
          {custom.busy
            ? it
              ? 'Ottimizzo…'
              : 'Optimizing…'
            : it
              ? 'Scegli una foto'
              : 'Choose a photo'}
        </button>
        {custom.url && (
          <button
            type="button"
            className={styles.remove}
            aria-label={it ? 'Rimuovi il mio sfondo' : 'Remove my wallpaper'}
            onClick={async () => {
              try {
                await custom.remove()
                setCustomWallpaperEnabled(false)
              } catch {
                setError(
                  it
                    ? 'Impossibile rimuovere lo sfondo. Riprova.'
                    : 'Could not remove the wallpaper. Please try again.'
                )
              }
            }}
          >
            <Trash2 size={16} />
          </button>
        )}
        <input
          ref={input}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          aria-label={it ? 'Carica sfondo personale' : 'Upload personal wallpaper'}
          className={styles.file}
          onChange={(e) => void upload(e.target.files?.[0])}
        />
      </div>
      <p className={styles.localNote}>
        {it
          ? 'Ottimizzata e salvata solo in questo browser.'
          : 'Optimized and saved only in this browser.'}
      </p>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
      <div
        className={styles.mode}
        role="group"
        aria-label={it ? 'Modalità aspetto' : 'Appearance mode'}
      >
        {(['light', 'dark'] as const).map((mode) => (
          <button
            key={mode}
            aria-pressed={appearance.mode === mode}
            onClick={() => setAppearance({ mode })}
          >
            {mode === 'light' ? <Sun size={16} /> : <Moon size={16} />}{' '}
            {mode === 'light' ? (it ? 'Chiaro' : 'Light') : it ? 'Scuro' : 'Dark'}
          </button>
        ))}
      </div>
      <div className={styles.controls}>
        {[
          {
            label: it ? 'Sfondo delle app' : 'App background',
            value: appearance.surfaceColor,
            fallback: dark ? '#172235' : '#eef4fb',
            change: (surfaceColor: string) => setAppearance({ surfaceColor }),
          },
          {
            label: it ? 'Icone' : 'Icons',
            value: iconColor,
            fallback: theme.accent,
            change: setIconColor,
          },
          {
            label: it ? 'Testi' : 'Text',
            value: appearance.textColor,
            fallback: dark ? '#f2f5fb' : theme.ink,
            change: (textColor: string) => setAppearance({ textColor }),
          },
        ].map((field) => (
          <div className={styles.control} key={field.label}>
            <span>{field.label}</span>
            <div className={styles.colorActions}>
              <button
                type="button"
                aria-label={`${it ? 'Automatico' : 'Automatic'} — ${field.label}`}
                aria-pressed={field.value === 'auto'}
                onClick={() => field.change('auto')}
              >
                {it ? 'Auto' : 'Auto'}
              </button>
              <input
                type="color"
                aria-label={field.label}
                value={field.value === 'auto' ? field.fallback : field.value}
                onChange={(e) => field.change(e.target.value)}
              />
            </div>
          </div>
        ))}
        {[
          {
            label: it ? 'Opacità del vetro' : 'Glass opacity',
            value: appearance.surfaceOpacity ?? (dark ? 0.56 : theme.opacity),
            min: 0,
            change: (surfaceOpacity: number) => setAppearance({ surfaceOpacity }),
          },
          {
            label: it ? 'Opacità delle icone' : 'Icon opacity',
            value: appearance.iconOpacity,
            min: 0.25,
            change: (iconOpacity: number) => setAppearance({ iconOpacity }),
          },
          {
            label: it ? 'Intensità dello sfondo' : 'Wallpaper intensity',
            value: appearance.wallpaperOpacity,
            min: 0.2,
            change: (wallpaperOpacity: number) => setAppearance({ wallpaperOpacity }),
          },
        ].map((field) => (
          <label className={styles.sliderRow} key={field.label}>
            <span>
              {field.label}
              <output>{Math.round(field.value * 100)}%</output>
            </span>
            <input
              type="range"
              aria-label={field.label}
              min={field.min}
              max="1"
              step=".01"
              value={field.value}
              onChange={(e) => field.change(Number(e.target.value))}
            />
          </label>
        ))}
      </div>
      {lowContrast && (
        <p className={styles.contrastNote} role="status">
          {it
            ? 'Questa combinazione può rendere testi o icone poco leggibili. Prova i colori automatici, aumenta l’opacità o ripristina il tema.'
            : 'This combination may make text or icons hard to read. Try automatic colors, increase opacity or reset the theme.'}
        </p>
      )}
      <button type="button" className={styles.reset} onClick={resetAppearance}>
        <RotateCcw size={14} />
        {it ? 'Ripristina il tema' : 'Reset theme'}
      </button>
    </div>
  )
}
