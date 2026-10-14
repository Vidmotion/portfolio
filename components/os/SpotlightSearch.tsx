'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpotlightStore } from '@/store/spotlightStore'
import { useWindowStore } from '@/store/windowStore'
import { useApplicationLauncher } from '@/hooks/useApplicationLauncher'
import { getProjects, getNotes } from '@/lib/content'
import { useLocaleStore } from '@/store/localeStore'
import type { Locale } from '@/types'
import { categoryGradient } from '@/lib/utils'
import { springs, duration } from '@/lib/motion'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { categories } from '@/core/registries/categories'

type ResultItem =
  | { kind: 'project'; id: string; title: string; category: string }
  | { kind: 'note'; id: string; title: string }
  | { kind: 'category'; id: string; label: string }

function getResults(query: string, locale: Locale): ResultItem[] {
  const q = query.toLowerCase().trim()
  if (!q) return []

  const results: ResultItem[] = []

  for (const p of getProjects(locale)) {
    if (
      p.title.toLowerCase().includes(q) ||
      p.category.includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({ kind: 'project', id: p.id, title: p.title, category: p.category })
    }
  }
  for (const n of getNotes(locale)) {
    if (
      n.title.toLowerCase().includes(q) ||
      n.excerpt.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q)
    ) {
      results.push({ kind: 'note', id: n.id, title: n.title })
    }
  }
  for (const cat of categories) {
    if (cat.id.includes(q) || cat.label.toLowerCase().includes(q)) {
      results.push({ kind: 'category', id: cat.id, label: cat.label })
    }
  }

  return results.slice(0, 8)
}

export function SpotlightSearch() {
  const { isOpen, query, close, setQuery } = useSpotlightStore()
  const locale = useLocaleStore((s) => s.locale)
  const { openWindow } = useWindowStore()
  const { launch } = useApplicationLauncher()
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useFocusTrap(panelRef, isOpen, inputRef)

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, close])

  const handleSelect = (result: ResultItem) => {
    close()
    if (result.kind === 'project') {
      openWindow('project', result.title, 'lg', { projectId: result.id })
    } else if (result.kind === 'note') {
      launch('notes', { noteId: result.id })
    } else if (result.kind === 'category') {
      openWindow('finder', undefined, undefined, { category: result.id })
    }
  }

  const results = getResults(query, locale)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="spotlight-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.modal }}
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 'var(--z-modal)',
              background: 'rgba(0,0,0,0.28)',
            }}
          />
          <motion.div
            key="spotlight-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Spotlight Search"
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault()
                event.stopPropagation()
                close()
              }
              if (event.key === 'Enter' && event.target === inputRef.current && results.length) {
                event.preventDefault()
                handleSelect(results[0])
              }
            }}
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transformTemplate={(_, generated) =>
              `translateX(-50%)${generated === 'none' ? '' : ` ${generated}`}`
            }
            transition={springs.default}
            style={{
              position: 'fixed',
              top: '18%',
              left: '50%',
              width: '640px',
              maxWidth: 'calc(100vw - 32px)',
              maxHeight: 'calc(82dvh - 24px)',
              overflowY: 'auto',
              zIndex: 'var(--z-modal)',
              borderRadius: '20px',
              background: 'rgba(252,252,253,0.88)',
              backdropFilter: 'blur(52px) saturate(180%)',
              WebkitBackdropFilter: 'blur(52px) saturate(180%)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.8), 0 0 0 0.5px rgba(0,0,0,0.08), 0 40px 100px rgba(0,0,0,0.28)',
              overflowX: 'hidden',
              fontFamily: 'var(--font-text)',
            }}
          >
            {/* Search bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '18px 22px',
                borderBottom: results.length > 0 ? '0.5px solid rgba(0,0,0,0.07)' : 'none',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                style={{ flexShrink: 0, color: '#888' }}
              >
                <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M11.5 11.5L16 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label={
                  locale === 'it'
                    ? 'Cerca progetti, note e cartelle'
                    : 'Search projects, notes, categories'
                }
                placeholder={
                  locale === 'it'
                    ? 'Cerca progetti, note, cartelle…'
                    : 'Search projects, notes, categories…'
                }
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  fontSize: '18px',
                  fontWeight: 400,
                  letterSpacing: '-0.015em',
                  color: '#161617',
                  fontFamily: 'var(--font-display)',
                  caretColor: '#0a7eff',
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  style={{
                    fontSize: '12px',
                    color: '#999',
                    background: 'rgba(0,0,0,0.06)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '2px 7px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-text)',
                  }}
                >
                  Clear
                </button>
              )}
            </div>
            {/* Results */}
            {results.length > 0 && (
              <div style={{ padding: '8px 0', maxHeight: '340px', overflowY: 'auto' }}>
                {results.map((result, i) => (
                  <motion.button
                    key={`${result.kind}-${result.id}`}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...springs.default, delay: i * 0.02 }}
                    onClick={() => handleSelect(result)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '10px 22px',
                      background: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-text)',
                    }}
                    whileHover={{ background: 'rgba(10,126,255,0.08)' }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        flexShrink: 0,
                        background:
                          result.kind === 'project'
                            ? categoryGradient((result as { category: string }).category)
                            : result.kind === 'note'
                              ? 'linear-gradient(135deg,#FFD60A,#FF9F0A)'
                              : categoryGradient(result.id),
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          color: '#161617',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {result.kind === 'category'
                          ? (result as { label: string }).label
                          : result.title}
                      </div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: '#888',
                          marginTop: '1px',
                          textTransform: 'capitalize',
                        }}
                      >
                        {result.kind}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
            {query && results.length === 0 && (
              <div
                style={{
                  padding: '28px 22px',
                  textAlign: 'center',
                  fontSize: '14px',
                  color: '#999',
                  letterSpacing: '-0.01em',
                }}
              >
                No results for &ldquo;{query}&rdquo;
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
