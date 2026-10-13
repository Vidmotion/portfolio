'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft } from 'lucide-react'
import { ProfileContent } from '@/components/ui/ProfileContent'
import { identity } from '@/core/registries/identity'
import { profile } from '@/core/registries/profile'
import { uiText } from '@/core/registries/locale'
import { useLocaleStore } from '@/store/localeStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useMobileMotion } from './useMobileMotion'
import type { MobileUtility } from '@/store/mobileStore'
import styles from './MobileUtilityView.module.css'

export function MobileUtilityView({
  utility,
  onBack,
}: {
  utility: MobileUtility
  onBack: () => void
}) {
  const locale = useLocaleStore((s) => s.locale)
  const { appEntrance, transformOrigin, present } = useMobileMotion()
  const text = uiText[locale]
  const { settings, setReducedMotion, setHighContrast } = useSettingsStore()
  const title =
    utility === 'about'
      ? text.about
      : utility === 'photos'
        ? text.photos
        : utility === 'settings'
          ? text.settings
          : text.contacts
  return (
    <motion.div
      {...appEntrance}
      role="region"
      aria-label={title}
      aria-hidden={!present}
      inert={!present}
      className={styles.view}
      style={{ transformOrigin, pointerEvents: present ? 'auto' : 'none' }}
    >
      <header className={styles.header}>
        <button onClick={onBack} className={styles.back} aria-label={`‹ ${text.home}`}>
          <ChevronLeft size={22} aria-hidden />
          {text.home}
        </button>
        <h1>{title}</h1>
      </header>
      <div className={styles.content}>
        {utility === 'about' && <ProfileContent />}
        {utility === 'photos' && (
          <div className={styles.photos}>
            <figure className={styles.portraitPhoto}>
              <Image
                src={profile.portrait}
                alt={identity.name}
                width={480}
                height={480}
                sizes="(max-width: 600px) 100vw, 480px"
              />
              <figcaption>
                {text.portrait} · {identity.name}
              </figcaption>
            </figure>
            <p>{text.noPhotos}</p>
          </div>
        )}
        {utility === 'contacts' && (
          <>
            <div className={styles.contactIdentity}>
              <Image
                src={profile.portrait}
                alt=""
                width={76}
                height={76}
                className={styles.portrait}
              />
              <strong>{identity.name}</strong>
              <span>{profile.title}</span>
            </div>
            <div className={styles.group}>
              <a href={`mailto:${identity.email}`}>
                {identity.email}
                <ArrowUpRight size={17} aria-hidden />
              </a>
              {identity.social.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label ?? social.platform}
                  <ArrowUpRight size={17} aria-hidden />
                </a>
              ))}
            </div>
          </>
        )}
        {utility === 'settings' && (
          <div className={styles.group}>
            {[
              {
                label: text.reduceMotion,
                checked: settings.accessibility.reducedMotion,
                change: setReducedMotion,
              },
              {
                label: text.contrast,
                checked: settings.accessibility.highContrast,
                change: setHighContrast,
              },
            ].map((setting) => (
              <div key={setting.label} className={styles.setting}>
                <span>{setting.label}</span>
                <button
                  className={styles.toggle}
                  role="switch"
                  aria-label={setting.label}
                  aria-checked={setting.checked}
                  onClick={() => setting.change(!setting.checked)}
                >
                  <span
                    className={styles.toggleTrack}
                    style={{ background: setting.checked ? '#34c759' : '#c7c7cc' }}
                  >
                    <span
                      className={styles.toggleThumb}
                      style={{ transform: `translateX(${setting.checked ? 20 : 0}px)` }}
                    />
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
