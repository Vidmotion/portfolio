'use client'

import { motion } from 'framer-motion'
import { useWindowStore } from '@/store/windowStore'
import { getFeaturedProjects } from '@/lib/content'
import { categoryGradient, projectMeta, widgetDarkGlass } from '@/lib/utils'
import { springs, staggerDelay } from '@/lib/motion'

import { useLocaleStore } from '@/store/localeStore'
import { ProjectArtwork } from '@/components/ui/ProjectArtwork'

interface RecentProjectsWidgetProps {
  elevated?: boolean
}

export function RecentProjectsWidget({ elevated }: RecentProjectsWidgetProps) {
  const { openWindow } = useWindowStore()
  const locale = useLocaleStore((s) => s.locale)
  const featured = getFeaturedProjects(locale).slice(0, 3)

  return (
    <div
      className="glass-widget-squircle"
      style={{
        width: '370px',
        height: '220px',
        borderRadius: '26px',
        ...widgetDarkGlass(elevated),
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        fontFamily: 'var(--font-text)',
      }}
      aria-label="Recent projects widget"
    >
      {/* Header */}
      <div
        style={{
          fontSize: '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.42)',
          fontWeight: 600,
          marginBottom: '10px',
        }}
      >
        {locale === 'it' ? 'Progetti selezionati' : 'Selected Projects'}
      </div>

      {/* Project rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
        {featured.map((project, i) => (
          <motion.button
            key={project.id}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springs.default, delay: i * staggerDelay(3) }}
            onClick={() => openWindow('project', project.title, 'lg', { projectId: project.id })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              cursor: 'pointer',
              padding: '7px 8px',
              border: 0,
              background: 'transparent',
              textAlign: 'left',
              fontFamily: 'inherit',
              borderRadius: '11px',
            }}
            whileHover={{ background: 'rgba(255,255,255,0.07)' }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Thumbnail */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: categoryGradient(project.category),
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.40)',
              }}
              aria-hidden
            >
              <ProjectArtwork project={project} sizes="80px" />
            </div>
            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.92)',
                  letterSpacing: '-0.015em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {project.title}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.42)',
                  marginTop: '1px',
                  textTransform: 'capitalize',
                }}
              >
                {projectMeta(project, locale)}
              </div>
            </div>
            {/* Chevron */}
            <div
              style={{
                color: 'rgba(255,255,255,0.24)',
                fontSize: '16px',
                flexShrink: 0,
                lineHeight: 1,
              }}
            >
              ›
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
