'use client'

import { motion } from 'framer-motion'
import { useDesktopStore } from '@/store/desktopStore'
import { useWindowStore } from '@/store/windowStore'
import { useDragOffset } from '@/hooks/useDragOffset'
import { MacOSFolderIcon } from '@/components/ui/MacOSFolderIcon'
import { springs, staggerDelay } from '@/lib/motion'
import { categories } from '@/core/registries/categories'
import styles from './TabletResponsive.module.css'

// Plain macOS-style folder shell, no internal glyph — the folder itself is
// the visual identifier, distinguished only by its label underneath (same
// treatment as Desktop's folders, components/os/DesktopFolders.tsx).
const TABLET_FOLDERS = categories

interface TabletFoldersProps {
  containerRef: React.RefObject<HTMLDivElement | null>
}

interface DraggableTabletFolderProps {
  folder: (typeof TABLET_FOLDERS)[number]
  index: number
  offset: { x: number; y: number }
  locked: boolean
  isActive: boolean
  onSelect: () => void
  onDragEnd: (offset: { x: number; y: number }) => void
  containerRef: React.RefObject<HTMLDivElement | null>
}

// Same drag mechanics as Desktop's folders (components/os/DesktopFolders.tsx) via
// the shared useDragOffset hook — only the visual markup below is Tablet's own,
// unchanged. Constrained to the tablet screen (Desktop folders are unconstrained)
// since an unconstrained drag would push a folder outside the iPad bezel.
function DraggableTabletFolder({
  folder,
  index,
  offset,
  locked,
  isActive,
  onSelect,
  onDragEnd,
  containerRef,
}: DraggableTabletFolderProps) {
  const {
    x,
    y,
    isDragging,
    onDragStart,
    onDragEnd: handleDragEnd,
  } = useDragOffset({ offset, onDragEnd })

  return (
    <motion.button
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springs.default, delay: index * staggerDelay(TABLET_FOLDERS.length) }}
      drag={!locked}
      dragMomentum={false}
      dragElastic={0.04}
      dragConstraints={containerRef}
      dragTransition={{ bounceStiffness: 340, bounceDamping: 24 }}
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.94 }}
      whileDrag={{
        scale: 1.06,
        cursor: 'grabbing',
        transition: { type: 'spring', stiffness: 340, damping: 24 },
      }}
      onClick={onSelect}
      style={{
        x,
        y,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        background: 'transparent',
        border: 'none',
        padding: 0,
        outline: isActive ? '2px solid rgba(255,255,255,0.8)' : 'none',
        outlineOffset: '4px',
        borderRadius: '8px',
        touchAction: 'none',
        cursor: 'default',
      }}
      aria-label={folder.label}
      aria-pressed={isActive}
    >
      <MacOSFolderIcon icon={null} width={66} height={54} elevated={isDragging} />
      <span
        style={{
          fontSize: 'var(--tablet-folder-font, 11px)',
          color: '#fff',
          fontWeight: 500,
          textShadow: '0 1px 4px rgba(0,0,0,0.4)',
          textAlign: 'center',
          lineHeight: 1.15,
          fontFamily: 'var(--font-text)',
        }}
      >
        {folder.label}
      </span>
    </motion.button>
  )
}

export function TabletFolders({ containerRef }: TabletFoldersProps) {
  const { folderOffsets, setFolderOffset, isDesktopLocked, selectedFolderId, selectFolder } =
    useDesktopStore()
  const { openWindow } = useWindowStore()

  return (
    <div className={styles.folders} role="group" aria-label="Category folders">
      {TABLET_FOLDERS.map((folder, i) => (
        <DraggableTabletFolder
          key={folder.id}
          folder={folder}
          index={i}
          offset={folderOffsets[folder.id] ?? { x: 0, y: 0 }}
          locked={isDesktopLocked}
          isActive={selectedFolderId === folder.id}
          onSelect={() => {
            // Single tap opens the window (touch has no double-click) — reuses the
            // exact same openWindow call as Desktop's folder double-click.
            selectFolder(folder.id)
            openWindow('finder', undefined, undefined, { category: folder.id })
          }}
          onDragEnd={(off) => setFolderOffset(folder.id, off)}
          containerRef={containerRef}
        />
      ))}
    </div>
  )
}
