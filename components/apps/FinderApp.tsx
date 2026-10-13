'use client'

import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { useFinderStore } from '@/store/finderStore'
import { useWindowStore } from '@/store/windowStore'
import { useDesktopStore } from '@/store/desktopStore'
import { projects } from '@/lib/content'
import { categoryGradient } from '@/lib/utils'
import { springs, staggerDelay } from '@/lib/motion'
import { categories as CATEGORIES, normalizeCategory } from '@/core/registries/categories'
import { identity } from '@/core/registries/identity'
import { useLocaleStore } from '@/store/localeStore'
import { uiText } from '@/core/registries/locale'
import styles from './AppResponsive.module.css'
import type { ProjectCategory } from '@/types'

interface FinderAppProps {
  initialCategory?: ProjectCategory | null
  navigationRequest?: Record<string, unknown>
}

export function FinderApp({ initialCategory, navigationRequest }: FinderAppProps) {
  const locale = useLocaleStore((s) => s.locale)
  const text = uiText[locale]
  const {
    currentCategory,
    setCategory,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    selectedProjectId,
    selectProject,
  } = useFinderStore()
  const { openWindow } = useWindowStore()
  const { selectProject: selectDesktopProject } = useDesktopStore()

  // An explicit launch is a navigation request, even for the same folder.
  // A plain Dock relaunch keeps the current selection and search.
  const appliedInitial = useRef<{
    category: ProjectCategory | null | undefined
    request: Record<string, unknown> | undefined
  }>({ category: undefined, request: undefined })
  useEffect(() => {
    if (
      initialCategory !== undefined &&
      (initialCategory !== appliedInitial.current.category ||
        navigationRequest !== appliedInitial.current.request)
    ) {
      appliedInitial.current = { category: initialCategory, request: navigationRequest }
      setCategory(normalizeCategory(initialCategory))
      if (navigationRequest !== undefined) setSearchQuery('')
    }
  }, [initialCategory, navigationRequest, setCategory, setSearchQuery])

  const activeCategory = currentCategory

  const filtered = useMemo(() => {
    let list = activeCategory ? projects.filter((p) => p.category === activeCategory) : projects
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      )
    }
    return list
  }, [activeCategory, searchQuery])

  const finderTitle = activeCategory
    ? (CATEGORIES.find((c) => c.id === activeCategory)?.label ?? text.allProjects)
    : text.allProjects

  const openProject = (projectId: string, title: string) => {
    openWindow('project', title, 'lg', { projectId })
  }

  const selectProjectEverywhere = (projectId: string) => {
    selectProject(projectId)
    selectDesktopProject(projectId)
  }

  return (
    <div className={styles.shell}>
      {/* Sidebar */}
      <div
        className={styles.sidebar}
        style={{
          flexShrink: 0,
          background: 'rgba(248,248,249,0.5)',
          borderRight: '0.5px solid rgba(0,0,0,0.05)',
          padding: '18px 12px',
          overflowY: 'auto',
        }}
        role="navigation"
        aria-label="Finder sidebar"
      >
        <div
          style={{
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#6d6d75',
            fontWeight: 600,
            padding: '6px 10px 10px',
          }}
        >
          {locale === 'it' ? 'Libreria' : 'Library'}
        </div>

        <SidebarItem
          label={text.allProjects}
          count={projects.length}
          isActive={!activeCategory}
          onClick={() => setCategory(null)}
        />

        {CATEGORIES.map((cat) => (
          <SidebarItem
            key={cat.id}
            label={cat.label}
            count={projects.filter((p) => p.category === cat.id).length}
            isActive={activeCategory === cat.id}
            onClick={() => setCategory(cat.id)}
          />
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div className={styles.finderHeader}>
          <div>
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#6d6d75',
                fontWeight: 600,
              }}
            >
              {identity.name}
            </div>
            <div
              style={{
                fontSize: '30px',
                fontWeight: 600,
                color: '#161617',
                letterSpacing: '-0.025em',
                marginTop: '4px',
                fontFamily: 'var(--font-display)',
              }}
            >
              {finderTitle}
            </div>
          </div>

          <div className={styles.finderTools}>
            {/* Search */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '26px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.06)',
                padding: '0 10px',
              }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <circle cx="4.5" cy="4.5" r="3.5" stroke="#a0a0a5" strokeWidth="1.1" />
                <path d="M7.5 7.5l2 2" stroke="#a0a0a5" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                placeholder={text.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '12px',
                  color: '#161617',
                  width: '110px',
                  fontFamily: 'var(--font-text)',
                }}
                aria-label="Search projects"
              />
            </div>

            <span style={{ fontSize: '13px', color: '#6d6d75' }}>
              {filtered.length}{' '}
              {locale === 'it'
                ? filtered.length === 1
                  ? 'progetto'
                  : 'progetti'
                : filtered.length === 1
                  ? 'project'
                  : 'projects'}
            </span>

            {/* View toggle */}
            <div
              style={{
                display: 'flex',
                background: 'rgba(0,0,0,0.05)',
                borderRadius: '9px',
                padding: '2px',
              }}
            >
              {(['grid', 'list'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  style={{
                    padding: '5px 13px',
                    borderRadius: '7px',
                    background: viewMode === mode ? '#fff' : 'transparent',
                    fontSize: '12px',
                    fontWeight: viewMode === mode ? 600 : 500,
                    color: viewMode === mode ? '#161617' : '#8a8a8f',
                    boxShadow: viewMode === mode ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                    cursor: 'default',
                    border: 'none',
                    fontFamily: 'var(--font-text)',
                    transition: 'all 0.12s ease',
                  }}
                  aria-label={`${mode} view`}
                  aria-pressed={viewMode === mode}
                >
                  {mode === 'grid' ? text.grid : text.list}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '4px var(--app-pad) var(--app-pad)',
            minHeight: 0,
          }}
        >
          {filtered.length === 0 ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '200px',
                color: '#6d6d75',
                fontSize: '13px',
              }}
            >
              {text.noProjects}
            </div>
          ) : viewMode === 'grid' ? (
            <div className={styles.finderGrid}>
              {filtered.map((project, i) => (
                <motion.button
                  key={project.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springs.default, delay: i * staggerDelay(filtered.length) }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => selectProjectEverywhere(project.id)}
                  onPointerUp={(event) => {
                    if (event.pointerType === 'touch' || event.pointerType === 'pen')
                      openProject(project.id, project.title)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault()
                      openProject(project.id, project.title)
                    }
                  }}
                  onDoubleClick={() => openProject(project.id, project.title)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'default',
                    padding: 0,
                    textAlign: 'left',
                    outline: selectedProjectId === project.id ? '2px solid #0a7eff' : 'none',
                    outlineOffset: '3px',
                    borderRadius: '14px',
                  }}
                  title={text.tapToOpen}
                >
                  {/* Cover */}
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '4/3',
                      borderRadius: '14px',
                      position: 'relative',
                      overflow: 'hidden',
                      background: categoryGradient(project.category),
                      boxShadow: '0 1px 2px rgba(0,0,0,0.04),0 10px 26px rgba(0,0,0,0.1)',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: '11px',
                        left: '13px',
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

                  {/* Labels */}
                  <div>
                    <div
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#161617',
                        letterSpacing: '-0.015em',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      {project.title}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#6d6d75',
                        marginTop: '2px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {project.category.replace('-', ' ')} · {project.year}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {filtered.map((project, i) => (
                <motion.button
                  className={styles.listRow}
                  key={project.id}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...springs.default, delay: i * staggerDelay(filtered.length) }}
                  onClick={() => selectProjectEverywhere(project.id)}
                  onPointerUp={(event) => {
                    if (event.pointerType === 'touch' || event.pointerType === 'pen')
                      openProject(project.id, project.title)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault()
                      openProject(project.id, project.title)
                    }
                  }}
                  onDoubleClick={() => openProject(project.id, project.title)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 10px',
                    background:
                      selectedProjectId === project.id ? 'rgba(10,126,255,0.1)' : 'transparent',
                    border: 'none',
                    cursor: 'default',
                    textAlign: 'left',
                    borderRadius: '8px',
                    transition: 'background 0.1s ease',
                    fontFamily: 'var(--font-text)',
                  }}
                  whileHover={{
                    backgroundColor:
                      selectedProjectId === project.id ? undefined : 'rgba(0,0,0,0.04)',
                  }}
                  title={text.tapToOpen}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '30px',
                      borderRadius: '5px',
                      background: categoryGradient(project.category),
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#161617',
                        letterSpacing: '-0.01em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {project.title}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#6d6d75',
                      flexShrink: 0,
                      textTransform: 'capitalize',
                    }}
                  >
                    {project.category.replace('-', ' ')}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#6d6d75',
                      flexShrink: 0,
                      width: '36px',
                      textAlign: 'right',
                    }}
                  >
                    {project.year}
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Sidebar Item ─────────────────────────────────────────────────────────────

interface SidebarItemProps {
  label: string
  count: number
  isActive: boolean
  onClick: () => void
}

function SidebarItem({ label, count, isActive, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 'calc(100% - 0px)',
        padding: '7px 10px',
        borderRadius: '8px',
        background: isActive ? 'rgba(10,126,255,0.1)' : 'transparent',
        border: 'none',
        cursor: 'default',
        marginBottom: '1px',
        fontFamily: 'var(--font-text)',
      }}
      aria-current={isActive ? 'page' : undefined}
    >
      <span
        style={{
          fontSize: '13px',
          fontWeight: isActive ? 600 : 400,
          color: isActive ? '#0a7eff' : '#46464a',
          letterSpacing: '-0.005em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1,
          textAlign: 'left',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: '12px',
          color: isActive ? '#0a7eff' : '#a0a0a5',
          flexShrink: 0,
          marginLeft: '4px',
        }}
      >
        {count}
      </span>
    </button>
  )
}
