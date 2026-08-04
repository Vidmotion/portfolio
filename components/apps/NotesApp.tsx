'use client'

// Notes is READ-ONLY in v1. Users read MDX content — they do not create or edit notes.
// Note Editor and Writing Mode are v2 scope.

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { notes } from '@/lib/content'
import { springs } from '@/lib/motion'

export function NotesApp() {
  const [selectedNoteId, setSelectedNoteId] = useState(notes[0]?.id ?? null)
  const selectedNote = notes.find((n) => n.id === selectedNoteId)

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'var(--font-text)' }}>
      {/* Sidebar — 216px */}
      <div
        style={{
          width: '216px',
          flexShrink: 0,
          borderRight: '0.5px solid rgba(0,0,0,0.06)',
          padding: '12px 0',
          background: 'rgba(250,250,251,0.7)',
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
          <span style={{ fontSize: '12px', color: '#c0c0c5' }}>Search</span>
        </div>

        {/* Note list */}
        {notes.map((note) => (
          <button
            key={note.id}
            onClick={() => setSelectedNoteId(note.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 14px',
              textAlign: 'left',
              background: selectedNoteId === note.id ? 'rgba(10,126,255,0.08)' : 'transparent',
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
                color: '#161617',
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
                color: '#a0a0a5',
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
          overflowY: 'auto',
          background: '#fff',
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
              style={{ padding: '56px 72px', maxWidth: '680px' }}
              role="article"
              aria-label={selectedNote.title}
            >
              {/* Kicker */}
              <p
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#b0b0b5',
                  fontWeight: 600,
                }}
              >
                Notes
              </p>

              {/* Title */}
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '38px',
                  fontWeight: 600,
                  color: '#161617',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  margin: '14px 0 32px',
                }}
              >
                {selectedNote.title}
              </h1>

              <NoteContent content={selectedNote.content} />
            </motion.div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#a0a0a5',
                fontSize: '13px',
              }}
            >
              Select a note
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
            color: '#161617',
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
            color: '#161617',
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
            color: '#161617',
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
            color: '#0a7eff',
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
            color: '#33333a',
            lineHeight: 1.85,
            letterSpacing: '-0.011em',
            marginBottom: '4px',
          }}
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }}
        />
      )
    }

    i++
  }

  return <>{elements}</>
}
