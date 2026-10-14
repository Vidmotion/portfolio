'use client'

import { motion } from 'framer-motion'
import { getProjectBySlug } from '@/lib/content'
import { categoryGradient, projectMeta } from '@/lib/utils'
import { springs } from '@/lib/motion'
import styles from './AppResponsive.module.css'
import { useLocaleStore } from '@/store/localeStore'
import { uiText } from '@/core/registries/locale'
import { ProjectArtwork, projectCoverTextColor } from '@/components/ui/ProjectArtwork'
import { ProjectStory } from './ProjectStory'

interface ProjectAppProps {
  projectId: string
}

export function ProjectApp({ projectId }: ProjectAppProps) {
  const locale = useLocaleStore((s) => s.locale)
  const project = getProjectBySlug(projectId, locale)

  if (!project) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#a0a0a5',
          fontFamily: 'var(--font-text)',
          fontSize: '13px',
        }}
      >
        {uiText[locale].projectNotFound}
      </div>
    )
  }

  const coverGradient = categoryGradient(project.category)
  const coverText = projectCoverTextColor(project)

  return (
    <div
      className={styles.project}
      style={{
        height: '100%',
        overflowY: 'auto',
        fontFamily: 'var(--font-text)',
        background: 'rgba(252,252,253,0.82)',
      }}
    >
      {/* Hero cover — fixed height 380px */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          background: coverGradient,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <ProjectArtwork project={project} />
        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: project.preview
              ? 'none'
              : 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)',
          }}
          aria-hidden
        />

        {/* Cover meta */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, ...springs.default }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '0 var(--project-side) var(--project-bottom)',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: project.preview ? coverText : 'rgba(255,255,255,0.82)',
              fontWeight: 500,
              marginBottom: '10px',
            }}
          >
            {projectMeta(project, locale)}
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--project-title)',
              fontWeight: 600,
              color: project.preview ? coverText : '#fff',
              letterSpacing: '-0.035em',
              lineHeight: 1.0,
              maxWidth: '660px',
            }}
          >
            {project.title}
          </h1>
          {project.client && (
            <p
              style={{
                fontSize: '15px',
                color: project.preview ? coverText : 'rgba(255,255,255,0.6)',
                marginTop: '10px',
                fontWeight: 400,
              }}
            >
              {project.client}
            </p>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ...springs.default }}
        style={{ padding: 'var(--project-body)', maxWidth: '660px' }}
      >
        <ProjectStory project={project} locale={locale} />
      </motion.div>
    </div>
  )
}
