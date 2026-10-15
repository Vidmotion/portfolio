import { ImageResponse } from 'next/og'

export const alt = 'Carlo Desantis — Brand communication, digital design and visual production'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        padding: 48,
        background: 'linear-gradient(130deg, #edf5fc, #8eb9dd 60%, #326a9a)',
        color: '#18344e',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          padding: '38px 48px',
          borderRadius: 32,
          border: '1px solid #ffffffb0',
          background: '#f3f8fbd9',
          boxShadow: '0 24px 60px #12365225',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              display: 'flex',
              width: 12,
              height: 12,
              borderRadius: 50,
              background: '#417eaf',
            }}
          />
          <span style={{ fontSize: 22 }}>PORTFOLIO OS</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -4 }}>Carlo Desantis</div>
          <div style={{ fontSize: 33, lineHeight: 1.35, maxWidth: 820 }}>
            Brand communication, digital design & visual production.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 20,
          }}
        >
          <span>Creative Direction · Digital · Film Making</span>
          <span>carlodesantis.com ↗</span>
        </div>
      </div>
    </div>,
    size
  )
}
