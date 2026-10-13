'use client'

interface MacOSFolderIconProps {
  icon: React.ReactNode
  width?: number
  height?: number
  elevated?: boolean
}

/** 3-layer macOS folder illustration. Base geometry is tuned for the 74×60 desktop
 * size; other sizes scale uniformly off `height` so Desktop/Tablet stay visually identical. */
export function MacOSFolderIcon({ icon, width = 74, height = 60, elevated }: MacOSFolderIconProps) {
  const s = height / 60

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative',
        flexShrink: 0,
        filter: elevated
          ? `drop-shadow(0 ${16 * s}px ${26 * s}px rgba(20,50,90,0.42))`
          : `drop-shadow(0 ${6 * s}px ${11 * s}px rgba(20,50,90,0.28))`,
        transition: 'filter 0.15s ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: `${3 * s}px`,
          left: `${7 * s}px`,
          width: `${30 * s}px`,
          height: `${13 * s}px`,
          borderRadius: `${7 * s}px ${10 * s}px 0 0`,
          background: 'linear-gradient(#8dbfee, #7cb1e7)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: `${10 * s}px`,
          left: `${3 * s}px`,
          right: `${3 * s}px`,
          bottom: `${3 * s}px`,
          borderRadius: `${9 * s}px`,
          background: 'linear-gradient(#d2e7ff, #bcd9f7)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: `${15 * s}px`,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: `${10 * s}px`,
          background: 'linear-gradient(165deg, #a6d0f5, #7eb4e6)',
          boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.65),inset 0 -3px 6px rgba(40,90,150,0.28)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
    </div>
  )
}
