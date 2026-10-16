'use client'

import { AppGlyph } from '@/components/ui/AppGlyph'
import { WallpaperLayer } from '@/components/os/WallpaperLayer'
import { useDesktopStore } from '@/store/desktopStore'
import { useLocaleStore } from '@/store/localeStore'
import { uiText } from '@/core/registries/locale'
import { useTime } from '@/hooks/useTime'
import styles from './AppearancePreview.module.css'

/** Non-interactive samples use the same wallpaper, material and icon masters as the home. */
export function AppearancePreview() {
  const wallpaper = useDesktopStore((s) => s.wallpaper)
  const locale = useLocaleStore((s) => s.locale)
  const { bigTime } = useTime()
  const text = uiText[locale]
  return (
    <div
      className={styles.preview}
      data-appearance-preview=""
      data-wallpaper-surface=""
      role="img"
      aria-label={
        locale === 'it'
          ? 'Anteprima dal vivo di sfondo, icone e testi'
          : 'Live preview of wallpaper, icons and text'
      }
    >
      <WallpaperLayer wallpaper={wallpaper} />
      <div className={styles.scene}>
        <div className={styles.clock}>
          <small>CARLO’S iPHONE</small>
          <strong>{bigTime}</strong>
        </div>
        <div className={styles.apps}>
          {(
            [
              ['projects', text.projects],
              ['about', text.about],
              ['photos', text.photos],
              ['settings', text.settings],
            ] as const
          ).map(([icon, label]) => (
            <div className={styles.app} key={icon}>
              <div className={styles.tile} data-app-tile="">
                <AppGlyph icon={icon} />
              </div>
              <span data-wallpaper-label="" className={styles.label}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
