'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuickLookStore } from '@/store/quickLookStore'
import { getProjectBySlug } from '@/lib/content'
import { categoryGradient, projectMeta } from '@/lib/utils'
import { categoryLabel } from '@/core/registries/categories'
import { useLocaleStore } from '@/store/localeStore'
import { ProjectArtwork } from '@/components/ui/ProjectArtwork'
import { springs, duration } from '@/lib/motion'
import { useFocusTrap } from '@/hooks/useFocusTrap'

export function QuickLook() {
  const { isOpen, projectId, close } = useQuickLookStore()
  const locale = useLocaleStore((s) => s.locale)
  const project = projectId ? getProjectBySlug(projectId, locale) : undefined
  const panelRef = useRef<HTMLDivElement>(null)

  useFocusTrap(panelRef, isOpen && !!project)

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === 'Escape' ||
        (e.key === ' ' && !(e.target as HTMLElement).closest('button, input, a'))
      ) {
        e.preventDefault()
        close()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, close])

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          <motion.div
            key="quicklook-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.modal }}
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 'var(--z-modal)',
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />
          <motion.div
            key="quicklook-card"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Quick Look: ${project.title}`}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transformTemplate={(_, generated) =>
              `translate(-50%, -50%)${generated === 'none' ? '' : ` ${generated}`}`
            }
            transition={springs.largeWindow}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              width: '480px',
              maxWidth: 'calc(100vw - 32px)',
              maxHeight: 'calc(100dvh - 48px)',
              overflowY: 'auto',
              zIndex: 'var(--z-modal)',
              borderRadius: '22px',
              overflowX: 'hidden',
              background: 'rgba(252,252,253,0.9)',
              backdropFilter: 'blur(48px) saturate(180%)',
              WebkitBackdropFilter: 'blur(48px) saturate(180%)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.8), 0 0 0 0.5px rgba(0,0,0,0.07), 0 48px 120px rgba(0,0,0,0.34)',
              fontFamily: 'var(--font-text)',
            }}
          >
            {/* Cover */}
            <div
              style={{
                height: '260px',
                background: categoryGradient(project.category),
                flexShrink: 0,
                position: 'relative',
              }}
            >
              <ProjectArtwork project={project} sizes="480px" />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.4) 100%)',
                }}
              />
              <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
                <div
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.72)',
                    fontWeight: 600,
                    marginBottom: '6px',
                  }}
                >
                  {categoryLabel(project.category)}
                </div>
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    color: '#fff',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {project.title}
                </div>
              </div>
            </div>
            {/* Body */}
            <div style={{ padding: '22px 24px 26px' }}>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.65,
                  color: '#33333a',
                  letterSpacing: '-0.01em',
                  margin: 0,
                }}
              >
                {project.summary}
              </p>
              <div style={{ display: 'flex', gap: '6px', marginTop: '16px', flexWrap: 'wrap' }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      color: '#5e5e63',
                      background: 'rgba(0,0,0,0.05)',
                      borderRadius: '6px',
                      padding: '3px 8px',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '18px',
                  paddingTop: '14px',
                  borderTop: '0.5px solid rgba(0,0,0,0.08)',
                }}
              >
                <span style={{ fontSize: '12px', color: '#a0a0a5' }}>
                  {projectMeta(project, locale)}
                </span>
                <span style={{ fontSize: '11px', color: '#999' }}>
                  {locale === 'it' ? 'Spazio o Esc per chiudere' : 'Space or Esc to close'}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
