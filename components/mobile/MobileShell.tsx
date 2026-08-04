'use client'

import { AnimatePresence } from 'framer-motion'
import { useMobileStore } from '@/store/mobileStore'
import { MobileStatusBar } from './MobileStatusBar'
import { MobileLockScreen } from './MobileLockScreen'
import { MobileHomeScreen } from './MobileHomeScreen'
import { MobileAppView } from './MobileAppView'
import { MobileProjectView } from './MobileProjectView'

export function MobileShell() {
  const { screen, activeCategory, activeProjectId, unlock, openApp, openProject, goBack } = useMobileStore()

  const isLight = screen === 'lock' || screen === 'home'

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        // Home Screen reference (Figma) ships its own top vignette baked into the
        // wallpaper layer — reproduced here as a layered gradient over the photo.
        background:
          'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 7.5%, rgba(0,0,0,0) 38.2%, rgba(0,0,0,0) 100%), url(/images/mobile/home-wallpaper.jpg) center/cover no-repeat',
        fontFamily: 'var(--font-text)',
      }}
      role="main"
      aria-label="Mobile — iOS experience"
    >
      {/* Status bar — the new Home Screen design (Figma) has no simulated status
          bar chrome; it relies on real device safe-area insets instead. Lock/App/
          Project screens keep the existing simulated bar. */}
      {screen !== 'home' && <MobileStatusBar light={isLight} />}

      {/* Screens */}
      <AnimatePresence mode="wait">
        {screen === 'lock' && (
          <MobileLockScreen key="lock" onUnlock={unlock} />
        )}
        {screen === 'home' && <MobileHomeScreen key="home" onOpenApp={openApp} />}
        {screen === 'app' && activeCategory && (
          <MobileAppView
            key="app"
            category={activeCategory}
            onOpenProject={openProject}
            onBack={goBack}
          />
        )}
        {screen === 'project' && activeProjectId && (
          <MobileProjectView
            key="project"
            projectId={activeProjectId}
            onBack={goBack}
          />
        )}
      </AnimatePresence>

      {/* Home indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '9px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '130px',
          height: '5px',
          borderRadius: '9999px',
          background: isLight ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.25)',
          zIndex: 40,
          pointerEvents: 'none',
        }}
        aria-hidden
      />
    </div>
  )
}
