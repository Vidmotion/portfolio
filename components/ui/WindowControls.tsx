'use client'

interface WindowControlsProps {
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  isActive?: boolean
}

// Matches prototype: 12px circles, gap 8px, subtle border, exact colors
export function WindowControls({
  onClose,
  onMinimize,
  onMaximize,
  isActive = true,
}: WindowControlsProps) {
  const CONTROLS = [
    { label: 'Close window', color: isActive ? '#ff5f57' : '#dcdcde', onClick: onClose },
    { label: 'Minimize window', color: isActive ? '#febc2e' : '#dcdcde', onClick: onMinimize },
    { label: 'Maximize window', color: isActive ? '#28c840' : '#dcdcde', onClick: onMaximize },
  ]

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }} role="group" aria-label="Window controls">
      {CONTROLS.map(({ label, color, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: color,
            border: '0.5px solid rgba(0,0,0,0.06)',
            cursor: 'default',
            padding: 0,
            flexShrink: 0,
          }}
          aria-label={label}
        />
      ))}
    </div>
  )
}
