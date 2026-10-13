'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { BootScreen } from '@/components/os/BootScreen'
import { DesktopShell } from '@/components/os/DesktopShell'
import { TabletShell } from '@/components/tablet/TabletShell'
import { MobileShell } from '@/components/mobile/MobileShell'
import { usePlatform } from '@/hooks/usePlatform'
import { useLocaleStore } from '@/store/localeStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useAccessibilityPreferences } from '@/hooks/useAccessibilityPreferences'
import { EasterEggLayer } from '@/components/ui/EasterEggLayer'

export default function Home() {
  const [booted, setBooted] = useState(false)
  const platform = usePlatform()
  const locale = useLocaleStore((s) => s.locale)
  const reducedMotion = useSettingsStore((s) => s.settings.accessibility.reducedMotion)
  useAccessibilityPreferences()
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'user'}>
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
      {booted && <EasterEggLayer />}
    </MotionConfig>
  )
}
