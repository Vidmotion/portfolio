'use client'

import { motion } from 'framer-motion'
import { getProjectBySlug } from '@/lib/content'
import { categoryGradient } from '@/lib/utils'
import { categoryLabel } from '@/core/registries/categories'
import { springs, staggerDelay, galleryFade } from '@/lib/motion'
import styles from './AppResponsive.module.css'

interface ProjectAppProps {
  projectId: string
}

export function ProjectApp({ projectId }: ProjectAppProps) {
  const project = getProjectBySlug(projectId)

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
        Project not found.
      </div>
    )
  }

  const coverGradient = categoryGradient(project.category)

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
        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)',
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
              color: 'rgba(255,255,255,0.82)',
              fontWeight: 500,
              marginBottom: '10px',
            }}
          >
            {categoryLabel(project.category)} — {project.year}
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--project-title)',
              fontWeight: 600,
              color: '#fff',
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
                color: 'rgba(255,255,255,0.6)',
                marginTop: '10px',
                fontWeight: 400,
              }}
            >
              {project.client}
            </p>
          )}
        </motion.div>
      </motion.div>

      {/* Body */}
      <div style={{ padding: 'var(--project-body)', maxWidth: '660px' }}>
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...springs.default }}
          style={{
            fontSize: '22px',
            color: '#2a2a2c',
            lineHeight: 1.6,
            letterSpacing: '-0.018em',
            marginBottom: '48px',
            fontFamily: 'var(--font-display)',
          }}
        >
          {project.description}
        </motion.p>

        {/* Gallery hero image */}
        {project.gallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, ...springs.default }}
            style={{ marginBottom: '48px' }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '16px',
                background: coverGradient,
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
              aria-label="Project hero image"
            />
          </motion.div>
        )}

        {/* Additional gallery grid */}
        {project.gallery.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            style={{ marginBottom: '48px' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {project.gallery.slice(1, 3).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * staggerDelay(2), ...springs.default }}
                  style={{
                    aspectRatio: '4/3',
                    borderRadius: '12px',
                    background: coverGradient,
                    opacity: galleryFade(i),
                    overflow: 'hidden',
                  }}
                  aria-label={`Gallery image ${i + 2}`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Credits */}
        {project.credits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, ...springs.default }}
            style={{
              borderTop: '0.5px solid rgba(0,0,0,0.08)',
              paddingTop: '32px',
              marginBottom: '32px',
            }}
          >
            <p
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: '#b0b0b5',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Credits
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {project.credits.map((credit, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#a0a0a5',
                      letterSpacing: '0.01em',
                      flexShrink: 0,
                      minWidth: '160px',
                    }}
                  >
                    {credit.role}
                  </span>
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#2a2a2c',
                      letterSpacing: '-0.008em',
                    }}
                  >
                    {credit.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tags */}
        {project.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: '#5e5e63',
                  background: 'rgba(0,0,0,0.05)',
                  borderRadius: '6px',
                  padding: '4px 9px',
                  letterSpacing: '0.01em',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
