'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronRight, Play } from 'lucide-react'
import { identity } from '@/core/registries/identity'
import { profile } from '@/core/registries/profile'
import { playlist } from '@/core/registries/playlist'
import { categories } from '@/core/registries/categories'
import { uiText } from '@/core/registries/locale'
import { ProjectArtwork } from '@/components/ui/ProjectArtwork'
import { getProjects } from '@/lib/content'
import { categoryGradient, projectMeta } from '@/lib/utils'
import { useLocaleStore } from '@/store/localeStore'
import { useEasterEggStore } from '@/store/easterEggStore'
import { useLongPress } from '@/hooks/useLongPress'
import { MacOSFolderIcon } from '@/components/ui/MacOSFolderIcon'
import type { ProjectCategory } from '@/types'
import type { CSSProperties } from 'react'
import styles from './MobileHomeWidgets.module.css'
import { AppGlyph } from '@/components/ui/AppGlyph'

export type WidgetLaunch = (element: HTMLElement, action?: () => void) => void
type WidgetProps = { launch: WidgetLaunch; open?: () => void; reduced: boolean }

export function MusicWidget({ launch, open, reduced }: WidgetProps) {
  const text = uiText[useLocaleStore((s) => s.locale)]
  return (
    <motion.button
      className={styles.music}
      style={{ '--playlist-cover': `url("${playlist.cover}")` } as CSSProperties}
      onClick={(event) => launch(event.currentTarget, open)}
      whileTap={reduced ? undefined : { scale: 0.98 }}
    >
      <span className={styles.heading}>{text.onRepeat}</span>
      <span className={styles.musicBody}>
        <Image
          src={playlist.cover}
          alt=""
          width={80}
          height={80}
          className={styles.cover}
          draggable={false}
        />
        <span>
          <strong>{playlist.title}</strong>
          <small>{text.myPlaylist}</small>
          <span className={styles.play}>
            <Play size={13} fill="currentColor" aria-hidden />
            {text.play}
          </span>
        </span>
      </span>
    </motion.button>
  )
}

export function PortraitWidget({
  launch,
  open,
  reduced,
  wide = false,
}: WidgetProps & { wide?: boolean }) {
  const text = uiText[useLocaleStore((s) => s.locale)]
  const show = useEasterEggStore((s) => s.show)
  const hold = useLongPress(() => show('hello'))
  return (
    <motion.button
      className={`${styles.portrait} ${wide ? styles.widePortrait : ''}`}
      {...hold}
      aria-label={`${wide ? text.photos : text.portrait} ${identity.name}`}
      onClick={(event) => launch(event.currentTarget, open)}
      whileTap={reduced ? undefined : { scale: 0.98 }}
    >
      <Image
        src={profile.portrait}
        alt=""
        fill
        sizes={wide ? '400px' : '200px'}
        className={styles.portraitImage}
        draggable={false}
      />
      <span className={styles.photoCaption}>
        {wide ? text.photos : identity.name}
        <ArrowUpRight size={15} aria-hidden />
      </span>
    </motion.button>
  )
}

export function UpdateWidget() {
  const text = uiText[useLocaleStore((state) => state.locale)]
  return (
    <div className={styles.update} role="note" aria-label={text.updates}>
      <span className={styles.updateAccent} aria-hidden />
      <p>{text.websiteUpdate}</p>
    </div>
  )
}

export function FolderWidget({
  launch,
  open,
  reduced,
}: {
  launch: WidgetLaunch
  open: (category: ProjectCategory) => void
  reduced: boolean
}) {
  return (
    <div className={styles.folderWidget}>
      {categories.map((category) => (
        <motion.button
          key={category.id}
          aria-label={`Open ${category.label} folder`}
          onClick={(event) => launch(event.currentTarget, () => open(category.id))}
          whileTap={reduced ? undefined : { scale: 0.98 }}
        >
          <span className={styles.folderIcon} aria-hidden>
            <MacOSFolderIcon icon={null} width={24} height={20} tone="graphite" />
          </span>
          <span>{category.label}</span>
        </motion.button>
      ))}
    </div>
  )
}

export function ExpertiseWidget({ launch, open, reduced }: WidgetProps) {
  const locale = useLocaleStore((s) => s.locale)
  return (
    <motion.button
      className={styles.expertise}
      onClick={(event) => launch(event.currentTarget, open)}
      whileTap={reduced ? undefined : { scale: 0.98 }}
    >
      <span className={styles.heading}>{uiText[locale].expertise}</span>
      <span className={styles.expertiseList}>
        {profile.expertise[locale].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </span>
    </motion.button>
  )
}

export function HelloWidget({ launch, open, reduced }: WidgetProps) {
  const locale = useLocaleStore((s) => s.locale)
  const show = useEasterEggStore((s) => s.show)
  const hold = useLongPress(() => show('hello'))
  return (
    <motion.button
      className={styles.hello}
      {...hold}
      onClick={(event) => launch(event.currentTarget, open)}
      whileTap={reduced ? undefined : { scale: 0.98 }}
    >
      <strong>{locale === 'it' ? 'ciao.' : 'hello.'}</strong>
      <span>
        {uiText[locale].contact}
        <ArrowUpRight size={15} aria-hidden />
      </span>
    </motion.button>
  )
}

export function MailWidget({ launch, open, reduced }: WidgetProps) {
  const text = uiText[useLocaleStore((s) => s.locale)]
  return (
    <motion.button
      className={styles.mail}
      onClick={(event) => launch(event.currentTarget, open)}
      whileTap={reduced ? undefined : { scale: 0.98 }}
    >
      <span className={styles.mailIcon}>
        <AppGlyph icon="mail" />
      </span>
      <span>
        <small>{text.mail}</small>
        <strong>{identity.email}</strong>
      </span>
      <ArrowUpRight size={18} aria-hidden />
    </motion.button>
  )
}

export function ProjectPreviewWidget({
  launch,
  open,
  reduced,
}: {
  launch: WidgetLaunch
  open: (id: string) => void
  reduced: boolean
}) {
  const locale = useLocaleStore((s) => s.locale)
  const text = uiText[locale]
  const projects = getProjects(locale)
  return (
    <div className={styles.previews}>
      <span className={styles.heading}>{text.projectPreviews}</span>
      {projects
        .filter((project) => project.featured)
        .slice(0, 3)
        .map((project) => (
          <motion.button
            key={project.id}
            aria-label={`Open ${project.title}`}
            onClick={(event) => launch(event.currentTarget, () => open(project.id))}
            whileTap={reduced ? undefined : { scale: 0.98 }}
          >
            <span
              className={styles.projectThumb}
              style={{
                background: categoryGradient(project.category),
                position: 'relative',
                overflow: 'hidden',
              }}
              aria-hidden
            >
              <ProjectArtwork project={project} sizes="64px" />
            </span>
            <span>
              <strong>{project.title}</strong>
              <small>{projectMeta(project, locale)}</small>
            </span>
            <ChevronRight size={16} aria-hidden />
          </motion.button>
        ))}
    </div>
  )
}
