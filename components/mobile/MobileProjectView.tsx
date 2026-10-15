'use client'

import { motion } from 'framer-motion'
import { getProjectBySlug } from '@/lib/content'
import { categoryGradient, projectMeta } from '@/lib/utils'
import { useMobileMotion } from './useMobileMotion'
import { useLocaleStore } from '@/store/localeStore'
import { uiText } from '@/core/registries/locale'
import { ProjectArtwork, projectCoverTextColor } from '@/components/ui/ProjectArtwork'
import { ProjectStory } from '@/components/apps/ProjectStory'

interface MobileProjectViewProps {
  projectId: string
  onBack: () => void
}

export function MobileProjectView({ projectId, onBack }: MobileProjectViewProps) {
  const locale = useLocaleStore((state) => state.locale)
  const project = getProjectBySlug(projectId, locale)
  const text = uiText[locale]
  const { reduced, appTransition } = useMobileMotion()

  if (!project) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#fcfcfd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--ui-muted)',
          fontSize: '13px',
          fontFamily: 'var(--font-text)',
        }}
      >
        {text.projectNotFound}
      </div>
    )
  }

  const gradient = categoryGradient(project.category)

  const coverText = projectCoverTextColor(project)
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: 36 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, x: 36 }}
      transition={appTransition}
      style={{
        position: 'absolute',
        zIndex: 20,
        inset: 0,
        background: '#fcfcfd',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-text)',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: 'max(8px, env(safe-area-inset-top)) 16px 8px',
          minHeight: '60px',
          flexShrink: 0,
          background: 'var(--ui-surface)',
          color: 'var(--ui-ink)',
          borderBottom: '.5px solid var(--ui-border)',
        }}
      >
        <button
          type="button"
          onClick={onBack}
          aria-label={text.backToProjects}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--ui-raised)',
            color: 'var(--os-accent)',
            border: '.5px solid var(--ui-border)',
            fontSize: '26px',
            flexShrink: 0,
          }}
        >
          ‹
        </button>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {project.title}
        </span>
      </header>
      <div
        data-project-scroll={project.id}
        style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain' }}
      >
        {/* Cover */}
        <div
          style={{
            width: '100%',
            height: '330px',
            position: 'relative',
            background: gradient,
            display: 'flex',
            alignItems: 'flex-end',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <ProjectArtwork project={project} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: project.preview
                ? 'none'
                : 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 60%)',
            }}
            aria-hidden
          />

          {/* Cover meta */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              padding: '60px 24px 26px',
            }}
          >
            <div
              style={{
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: project.preview ? coverText : 'rgba(255,255,255,0.82)',
                fontWeight: 500,
              }}
            >
              {projectMeta(project, locale)}
            </div>
            <h1
              style={{
                fontSize: '34px',
                fontWeight: 600,
                color: coverText,
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
                marginTop: '8px',
                fontFamily: 'var(--font-display)',
              }}
            >
              {project.title}
            </h1>
          </div>
        </div>

        <div style={{ padding: '28px 24px 44px' }}>
          <ProjectStory project={project} locale={locale} mobile />
        </div>
      </div>
    </motion.div>
  )
}
