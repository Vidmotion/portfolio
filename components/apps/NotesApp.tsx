'use client'

// Notes is READ-ONLY in v1. Users read MDX content — they do not create or edit notes.
// Note Editor and Writing Mode are v2 scope.

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getNotes } from '@/lib/content'
import { springs } from '@/lib/motion'
import { useLocaleStore } from '@/store/localeStore'
import { uiText } from '@/core/registries/locale'
import styles from './AppResponsive.module.css'
import { ProfileContent } from '@/components/ui/ProfileContent'

export function NotesApp({
  initialNoteId,
  navigationRequest,
}: {
  initialNoteId?: string
  navigationRequest?: Record<string, unknown>
}) {
  const locale = useLocaleStore((s) => s.locale)
  const notes = getNotes(locale)
  const text = uiText[locale]
  const [selectedNoteId, setSelectedNoteId] = useState(initialNoteId ?? notes[0]?.id ?? null)
  const [query, setQuery] = useState('')
  const appliedInitial = useRef({ id: initialNoteId, request: navigationRequest })
  useEffect(() => {
    if (
      initialNoteId &&
      (appliedInitial.current.id !== initialNoteId ||
        appliedInitial.current.request !== navigationRequest)
    ) {
      appliedInitial.current = { id: initialNoteId, request: navigationRequest }
      setSelectedNoteId(initialNoteId)
      setQuery('')
    }
  }, [initialNoteId, navigationRequest])
  const filteredNotes = notes.filter((note) =>
    `${note.title} ${note.excerpt} ${note.content}`
      .toLocaleLowerCase()
      .includes(query.trim().toLocaleLowerCase())
  )
  const selectedNote = notes.find((n) => n.id === selectedNoteId)

  return (
    <div className={`${styles.shell} ${styles.notes}`}>
      {/* Sidebar — 216px */}
      <div
        className={styles.sidebar}
        style={{
          flexShrink: 0,
          borderRight: '0.5px solid rgba(0,0,0,0.06)',
          padding: '12px 0',
          background: 'var(--ui-raised)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
        role="navigation"
        aria-label="Notes list"
      >
        {/* Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            margin: '0 10px 10px',
            height: '26px',
            borderRadius: '8px',
            background: 'rgba(0,0,0,0.06)',
            padding: '0 10px',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="4.5" cy="4.5" r="3.5" stroke="#a0a0a5" strokeWidth="1" />
            <path d="M7.5 7.5l1.5 1.5" stroke="#a0a0a5" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={text.search}
            aria-label={text.search}
            style={{
              minWidth: 0,
              width: '100%',
              background: 'transparent',
              border: 0,
              color: 'var(--ui-ink)',
              fontSize: '12px',
            }}
          />
        </div>

        {/* Note list */}
        {filteredNotes.length === 0 && (
          <p style={{ padding: '12px', fontSize: '12px', color: 'var(--ui-muted)' }}>
            {text.selectNote}
          </p>
        )}
        {filteredNotes.map((note) => (
          <button
            key={note.id}
            onClick={() => setSelectedNoteId(note.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 14px',
              textAlign: 'left',
              background:
                selectedNoteId === note.id ? 'rgba(var(--os-accent-rgb),.08)' : 'transparent',
              borderBottom: '0.5px solid rgba(0,0,0,0.04)',
              border: 'none',
              cursor: 'default',
              fontFamily: 'var(--font-text)',
              width: '100%',
            }}
            aria-current={selectedNoteId === note.id ? 'page' : undefined}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--ui-ink)',
                letterSpacing: '-0.008em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block',
              }}
            >
              {note.title}
            </span>
            <span
              style={{
                fontSize: '11px',
                color: 'var(--ui-muted)',
                marginTop: '2px',
                lineHeight: 1.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block',
              }}
            >
              {note.excerpt}
            </span>
          </button>
        ))}
      </div>

      {/* Note viewer — white content area */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          overflowY: 'auto',
          background: 'var(--ui-raised)',
        }}
      >
        <AnimatePresence mode="wait">
          {selectedNote ? (
            <motion.div
              key={selectedNote.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={springs.default}
              className={styles.note}
              role="article"
              aria-label={selectedNote.title}
            >
              {/* Kicker */}
              <p
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--ui-muted)',
                  fontWeight: 600,
                }}
              >
                Notes
              </p>

              {/* Title */}
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--note-title)',
                  fontWeight: 600,
                  color: 'var(--ui-ink)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  margin: '14px 0 32px',
                }}
              >
                {selectedNote.title}
              </h1>

              {selectedNote.id === 'bio' ? (
                <ProfileContent />
              ) : (
                <NoteContent content={selectedNote.content} />
              )}
            </motion.div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'var(--ui-muted)',
                fontSize: '13px',
              }}
            >
              {text.selectNote}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Markdown Renderer ─────────────────────────────────────────────────────────

function NoteContent({ content }: { content: string }) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('# ')) {
      elements.push(
        <h1
          key={i}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 600,
            color: 'var(--ui-ink)',
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            marginBottom: '20px',
            marginTop: '36px',
          }}
        >
          {line.slice(2)}
        </h1>
      )
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={i}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            fontWeight: 600,
            color: 'var(--ui-ink)',
            letterSpacing: '-0.018em',
            marginBottom: '10px',
            marginTop: '32px',
          }}
        >
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p
          key={i}
          style={{
            fontSize: '17px',
            fontWeight: 600,
            color: 'var(--ui-ink)',
            lineHeight: 1.85,
            letterSpacing: '-0.011em',
            marginBottom: '8px',
          }}
        >
          {line.slice(2, -2)}
        </p>
      )
    } else if (line === '---') {
      elements.push(
        <hr
          key={i}
          style={{
            border: 'none',
            borderTop: '0.5px solid rgba(0,0,0,0.08)',
            margin: '32px 0',
          }}
        />
      )
    } else if (line.trim() === '') {
      elements.push(<div key={i} style={{ height: '10px' }} />)
    } else if (line.startsWith('→')) {
      elements.push(
        <p
          key={i}
          style={{
            fontSize: '17px',
            color: 'var(--os-accent)',
            lineHeight: 1.85,
            letterSpacing: '-0.011em',
            marginBottom: '4px',
          }}
        >
          {line}
        </p>
      )
    } else {
      elements.push(
        <p
          key={i}
          style={{
            fontSize: '17px',
            color: 'var(--ui-ink)',
            lineHeight: 1.85,
            letterSpacing: '-0.011em',
            marginBottom: '4px',
          }}
          dangerouslySetInnerHTML={{
            __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
          }}
        />
      )
    }

    i++
  }

  return <>{elements}</>
}
