'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { useDesktopStore } from '@/store/desktopStore'
import { useLocaleStore } from '@/store/localeStore'
import { wallpapers, iconColors } from '@/core/registries/wallpapers'
import styles from './AppearanceSettings.module.css'

export function AppearanceSettings() {
  const { wallpaper, setWallpaper, iconColor, setIconColor } = useDesktopStore()
  const it = useLocaleStore((s) => s.locale) === 'it'
  return (
    <div className={styles.appearance}>
      <div className={styles.wallpapers} role="group" aria-label={it ? 'Sfondo' : 'Wallpaper'}>
        {wallpapers.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={`${it ? 'Sfondo' : 'Wallpaper'} ${i + 1}`}
            aria-pressed={wallpaper === item.id}
            onClick={() => setWallpaper(item.id)}
          >
            <Image src={item.src} alt="" fill sizes="(max-width: 600px) 45vw, 160px" unoptimized />
            {wallpaper === item.id && (
              <span className={styles.check}>
                <Check size={14} strokeWidth={3} />
              </span>
            )}
          </button>
        ))}
      </div>
      <div className={styles.colorHeading}>{it ? 'Colore icone' : 'Icon color'}</div>
      <div className={styles.colors} role="group" aria-label={it ? 'Colore icone' : 'Icon color'}>
        <button
          type="button"
          className={styles.auto}
          aria-label={it ? 'Segui lo sfondo' : 'Match wallpaper'}
          aria-pressed={iconColor === 'auto'}
          onClick={() => setIconColor('auto')}
        >
          {iconColor === 'auto' && <Check size={15} />}
        </button>
        {iconColors.map((color) => (
          <button
            key={color}
            type="button"
            style={{ background: color }}
            aria-label={`${it ? 'Colore icone' : 'Icon color'} ${color}`}
            aria-pressed={iconColor === color}
            onClick={() => setIconColor(color)}
          >
            {iconColor === color && (
              <Check size={15} color={color === '#f0f3fa' ? '#152d49' : '#fff'} />
            )}
          </button>
        ))}
        <label className={styles.custom} title={it ? 'Colore personalizzato' : 'Custom color'}>
          <span aria-hidden>+</span>
          <input
            type="color"
            aria-label={it ? 'Colore personalizzato' : 'Custom color'}
            value={iconColor === 'auto' ? '#234d83' : iconColor}
            onChange={(e) => setIconColor(e.target.value)}
          />
        </label>
      </div>
    </div>
  )
}
