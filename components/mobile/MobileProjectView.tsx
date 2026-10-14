'use client'

import { motion } from 'framer-motion'
import { getProjectBySlug } from '@/lib/content'
import { categoryGradient, projectMeta } from '@/lib/utils'
import { useMobileMotion } from './useMobileMotion'
import { useLocaleStore } from '@/store/localeStore'
import { uiText } from '@/core/registries/locale'
import { ProjectArtwork } from '@/components/ui/ProjectArtwork'
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
          color: '#a0a0a5',
          fontSize: '13px',
          fontFamily: 'var(--font-text)',
        }}
      >
        {text.projectNotFound}
      </div>
    )
  }

  const gradient = categoryGradient(project.category)

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
        overflowY: 'auto',
        fontFamily: 'var(--font-text)',
      }}
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
            background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 60%)',
          }}
          aria-hidden
        />

        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            top: '56px',
            left: '18px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.32)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: 'none',
            color: '#fff',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
          aria-label={text.backToProjects}
        >
          ‹
        </button>

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
              color: 'rgba(255,255,255,0.82)',
              fontWeight: 500,
            }}
          >
            {projectMeta(project, locale)}
          </div>
          <div
            style={{
              fontSize: '34px',
              fontWeight: 600,
              color: '#fff',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              marginTop: '8px',
              fontFamily: 'var(--font-display)',
            }}
          >
            {project.title}
          </div>
        </div>
      </div>

      <div style={{ padding: '28px 24px 44px' }}>
        <ProjectStory project={project} locale={locale} mobile />
      </div>
    </motion.div>
  )
}
