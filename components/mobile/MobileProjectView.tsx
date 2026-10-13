'use client'

import { motion } from 'framer-motion'
import { galleryFade } from '@/lib/motion'
import { getProjectBySlug } from '@/lib/content'
import { mobileCategoryGradient } from '@/core/registries/mobilePalette'
import { categoryLabel } from '@/core/registries/categories'
import { useMobileMotion } from './useMobileMotion'
import { useLocaleStore } from '@/store/localeStore'
import { uiText } from '@/core/registries/locale'

interface MobileProjectViewProps {
  projectId: string
  onBack: () => void
}

export function MobileProjectView({ projectId, onBack }: MobileProjectViewProps) {
  const project = getProjectBySlug(projectId)
  const text = uiText[useLocaleStore((state) => state.locale)]
  const { reduced, appTransition } = useMobileMotion()

  if (!project) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--mobile-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--mobile-muted)',
          fontSize: '13px',
          fontFamily: 'var(--font-text)',
        }}
      >
        {text.projectNotFound}
      </div>
    )
  }

  const gradient = mobileCategoryGradient(project.category)

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
        background: 'var(--mobile-surface)',
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
        }}
      >
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
            color: 'var(--mobile-butter)',
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
              color: 'var(--mobile-media-ink)',
              fontWeight: 500,
            }}
          >
            {categoryLabel(project.category)} · {project.year}
          </div>
          <div
            style={{
              fontSize: '34px',
              fontWeight: 600,
              color: 'var(--mobile-butter)',
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

      {/* Body */}
      <div style={{ padding: '28px 24px 44px' }}>
        <p
          style={{
            fontSize: '17px',
            lineHeight: 1.65,
            color: 'var(--mobile-text)',
            margin: '0 0 26px',
            letterSpacing: '-0.015em',
          }}
        >
          {project.description}
        </p>

        {/* Gallery */}
        {project.gallery.slice(0, 3).map((_, i) => (
          <div
            key={i}
            style={{
              width: '100%',
              aspectRatio: '4/3',
              borderRadius: '16px',
              marginBottom: '14px',
              background: gradient,
              opacity: galleryFade(i),
              boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 8px 20px rgba(0,0,0,0.07)',
            }}
            aria-hidden="true"
          />
        ))}

        {/* Credits */}
        <div
          style={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '0.5px solid rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--mobile-muted)',
              fontWeight: 600,
              marginBottom: '14px',
            }}
          >
            {text.credits}
          </div>

          {project.credits.map((credit, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '0.5px solid rgba(0,0,0,0.05)',
              }}
            >
              <span style={{ fontSize: '13px', color: 'var(--mobile-muted)' }}>{credit.role}</span>
              <span style={{ fontSize: '13px', color: 'var(--mobile-text)', fontWeight: 500 }}>
                {credit.name}
              </span>
            </div>
          ))}

          {project.client && (
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '14px' }}>
              <span style={{ fontSize: '13px', color: 'var(--mobile-muted)' }}>{text.client}</span>
              <span style={{ fontSize: '13px', color: 'var(--mobile-text)', fontWeight: 600 }}>
                {project.client}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
