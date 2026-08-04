'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BootScreen } from '@/components/os/BootScreen'
import { DesktopShell } from '@/components/os/DesktopShell'
import { TabletShell } from '@/components/tablet/TabletShell'
import { MobileShell } from '@/components/mobile/MobileShell'
import { usePlatform } from '@/hooks/usePlatform'

export default function Home() {
  const [booted, setBooted] = useState(false)
  const platform = usePlatform()

  return (
    <>
      {/* Boot screen — shown until boot sequence completes */}
      <AnimatePresence>
        {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      {/* Desktop — macOS-inspired experience */}
      {platform === 'desktop' && <DesktopShell />}

      {/* Tablet — iPadOS-inspired experience */}
      {platform === 'tablet' && booted && (
        <div className="fixed inset-0 overflow-hidden select-none" style={{ cursor: 'default' }}>
          <TabletShell />
        </div>
      )}

      {/* Mobile — iOS-inspired experience */}
      {platform === 'mobile' && booted && (
        <div className="fixed inset-0 overflow-hidden select-none" style={{ cursor: 'default' }}>
          <MobileShell />
        </div>
      )}
    </>
  )
}
