'use client'

import { motion } from 'framer-motion'
import { useDesktopStore } from '@/store/desktopStore'
import { useWindowStore } from '@/store/windowStore'
import { useDragOffset } from '@/hooks/useDragOffset'
import { MacOSFolderIcon } from '@/components/ui/MacOSFolderIcon'
import { springs, staggerDelay } from '@/lib/motion'
import { categories } from '@/core/registries/categories'

// Plain macOS-style folder shell, no internal glyph — the folder itself is
// the visual identifier, distinguished only by its label underneath.
const FOLDERS = categories

interface DraggableFolderProps {
  folder: (typeof FOLDERS)[number]
  index: number
  offset: { x: number; y: number }
  locked: boolean
  onSelect: () => void
  onOpen: () => void
  onDragEnd: (offset: { x: number; y: number }) => void
}

function DraggableFolder({ folder, index, offset, locked, onSelect, onOpen, onDragEnd }: DraggableFolderProps) {
  const { x, y, isDragging, onDragStart, onDragEnd: handleDragEnd } = useDragOffset({ offset, onDragEnd })

  return (
    <motion.button
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springs.default, delay: index * staggerDelay(FOLDERS.length) }}
      drag={!locked}
      dragMomentum={false}
      dragElastic={0.04}
      dragTransition={{ bounceStiffness: 340, bounceDamping: 24 }}
      style={{ x, y, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '9px', padding: '6px 4px', background: 'transparent', border: 'none', cursor: 'default', borderRadius: '12px', touchAction: 'none', fontFamily: 'var(--font-text)' }}
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      onDoubleClick={onOpen}
      onClick={onSelect}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      whileDrag={{
        scale: 1.06,
        cursor: 'grabbing',
        transition: { type: 'spring', stiffness: 340, damping: 24 },
      }}
      aria-label={`Open ${folder.label} folder`}
    >
      <MacOSFolderIcon icon={null} elevated={isDragging} />
      <span style={{ fontSize: '12px', color: '#fff', fontWeight: 500, textShadow: '0 1px 4px rgba(0,0,0,0.6)', textAlign: 'center', lineHeight: '1.2', letterSpacing: '-0.005em' }}>
        {folder.label}
      </span>
    </motion.button>
  )
}

export function DesktopFolders() {
  const { selectFolder, setFolderOffset, folderOffsets, isDesktopLocked } = useDesktopStore()
  const { openWindow } = useWindowStore()

  return (
    <div
      style={{ position: 'fixed', top: '60px', right: '34px', zIndex: 'var(--z-desktop-icons)', display: 'grid', gridTemplateColumns: 'repeat(2, 90px)', gap: '18px 6px', fontFamily: 'var(--font-text)' }}
      role="group"
      aria-label="Desktop folders"
    >
      {FOLDERS.map((folder, i) => (
        <DraggableFolder
          key={folder.id}
          folder={folder}
          index={i}
          offset={folderOffsets[folder.id] ?? { x: 0, y: 0 }}
          locked={isDesktopLocked}
          onSelect={() => selectFolder(folder.id)}
          onOpen={() => { selectFolder(folder.id); openWindow('finder', undefined, undefined, { category: folder.id }) }}
          onDragEnd={(off) => setFolderOffset(folder.id, off)}
        />
      ))}
    </div>
  )
}
