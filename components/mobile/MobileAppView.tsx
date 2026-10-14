'use client'

import { motion } from 'framer-motion'
import { springs, staggerDelay } from '@/lib/motion'
import { getProjects } from '@/lib/content'
import { categoryGradient, projectMeta } from '@/lib/utils'
import { categoryLabel } from '@/core/registries/categories'
import { categories } from '@/core/registries/categories'
import { MacOSFolderIcon } from '@/components/ui/MacOSFolderIcon'
import { useLocaleStore } from '@/store/localeStore'
import { uiText } from '@/core/registries/locale'
import { ProjectArtwork } from '@/components/ui/ProjectArtwork'
import type { ProjectCategory } from '@/types'
import { useMobileMotion } from './useMobileMotion'

interface MobileAppViewProps {
  category: ProjectCategory | null
  onOpenCategory: (category: ProjectCategory) => void
  onOpenProject: (id: string) => void
  onBack: () => void
}

export function MobileAppView({
  category,
  onOpenCategory,
  onOpenProject,
  onBack,
}: MobileAppViewProps) {
  const locale = useLocaleStore((s) => s.locale)
  const projects = getProjects(locale)
  const { appEntrance, transformOrigin, present } = useMobileMotion()
  const text = uiText[locale]
  const filtered = category ? projects.filter((p) => p.category === category) : []
  const title = category ? categoryLabel(category) : text.projects

  return (
    <motion.div
      {...appEntrance}
      aria-hidden={!present}
      inert={!present}
      style={{
        position: 'absolute',
        zIndex: 10,
        transformOrigin,
        pointerEvents: present ? 'auto' : 'none',
        inset: 0,
        background: '#fcfcfd',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-text)',
      }}
    >
      {/* Header */}
      <div
        style={{
          flexShrink: 0,
          padding: '62px 24px 16px',
          borderBottom: '0.5px solid rgba(0,0,0,0.06)',
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '15px',
            color: '#0066cc',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            padding: 0,
            minHeight: '44px',
            minWidth: '64px',
            fontWeight: 400,
            fontFamily: 'var(--font-text)',
          }}
          aria-label={`${text.back}: ${category ? text.projects : text.home}`}
        >
          ‹ {category ? text.projects : text.home}
        </button>
        <div
          style={{
            fontSize: '30px',
            fontWeight: 600,
            color: '#161617',
            letterSpacing: '-0.03em',
            marginTop: '10px',
            fontFamily: 'var(--font-display)',
          }}
        >
          {title}
        </div>
      </div>

      {/* Project list */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 18px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
        }}
      >
        {!category &&
          categories.map((folder) => (
            <button
              key={folder.id}
              onClick={() => onOpenCategory(folder.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '16px 8px',
                border: 'none',
                background: 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#161617',
              }}
              aria-label={`Open ${folder.label} folder`}
            >
              <MacOSFolderIcon icon={null} width={66} height={54} />
              <span style={{ fontSize: '19px', fontWeight: 500 }}>{folder.label}</span>
            </button>
          ))}
        {category && filtered.length === 0 && (
          <p style={{ color: '#666', fontSize: '15px', padding: '12px 8px' }}>{text.noProjects}</p>
        )}
        {filtered.map((project, i) => (
          <motion.button
            key={project.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.default, delay: i * staggerDelay(filtered.length) }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenProject(project.id)}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontFamily: 'var(--font-text)',
            }}
            aria-label={`Open ${project.title}`}
          >
            {/* Cover */}
            <div
              style={{
                width: '100%',
                aspectRatio: '3/2',
                borderRadius: '18px',
                position: 'relative',
                overflow: 'hidden',
                background: categoryGradient(project.category),
                boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 10px 26px rgba(0,0,0,0.1)',
              }}
            >
              <ProjectArtwork project={project} sizes="(max-width: 767px) 100vw, 400px" />
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '14px',
                  fontFamily: '"JetBrains Mono", "SF Mono", monospace',
                  fontSize: '8px',
                  letterSpacing: '0.06em',
                  color: 'rgba(255,255,255,0.7)',
                  textTransform: 'uppercase',
                }}
              >
                {project.category.replace('-', ' ')}
              </span>
            </div>

            <div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#161617',
                  letterSpacing: '-0.02em',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {project.title}
              </div>
              <div style={{ fontSize: '13px', color: '#a0a0a5', marginTop: '1px' }}>
                {projectMeta(project, locale)}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
