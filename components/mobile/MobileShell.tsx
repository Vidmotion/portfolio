'use client'

import { AnimatePresence } from 'framer-motion'
import { useMobileStore } from '@/store/mobileStore'
import { MobileStatusBar } from './MobileStatusBar'
import { MobileLockScreen } from './MobileLockScreen'
import { MobileHomeScreen } from './MobileHomeScreen'
import { MobileAppView } from './MobileAppView'
import { MobileProjectView } from './MobileProjectView'
import { MobileUtilityView } from './MobileUtilityView'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { identity } from '@/core/registries/identity'
import { playlist } from '@/core/registries/playlist'
import palette from '@/styles/generated/mobile-palette.module.css'
import theme from './MobileTheme.module.css'

export function MobileShell() {
  const {
    screen,
    activeCategory,
    activeProjectId,
    activeUtility,
    unlock,
    openApp,
    openUtility,
    openProject,
    goBack,
    setLaunchOrigin,
  } = useMobileStore()

  return (
    <div
      className={`${palette.palette} ${theme.shell}`}
      data-mobile-theme="butter"
      role="main"
      aria-label="Mobile — iOS experience"
    >
      {/* Status bar — the new Home Screen design (Figma) has no simulated status
          bar chrome; it relies on real device safe-area insets instead. Lock/App/
          Project screens keep the existing simulated bar. */}
      {screen !== 'home' && <MobileStatusBar light={screen === 'project'} />}

      {screen === 'lock' && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '86px',
            minHeight: '25px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'var(--mobile-butter)',
            background: 'var(--mobile-ganache)',
            borderRadius: '999px',
            zIndex: 50,
          }}
        >
          <LanguageSwitcher />
        </div>
      )}

      {/* Screens */}
      <AnimatePresence mode="sync">
        {screen === 'lock' && <MobileLockScreen key="lock" onUnlock={unlock} />}
        {screen === 'home' && (
          <MobileHomeScreen
            key="home"
            onOpenApp={openApp}
            onPrepareLaunch={setLaunchOrigin}
            onOpenProject={openProject}
            onOpenNotes={() => openUtility('about')}
            onOpenPhotos={() => openUtility('photos')}
            onOpenSettings={() => openUtility('settings')}
            onFindMe={() => openUtility('contacts')}
            onContact={() => {
              window.location.href = `mailto:${identity.email}`
            }}
            onOpenPlaylist={() => window.open(playlist.url, '_blank', 'noopener,noreferrer')}
          />
        )}
        {screen === 'app' && (
          <MobileAppView
            key="app"
            category={activeCategory}
            onOpenCategory={openApp}
            onOpenProject={openProject}
            onBack={goBack}
          />
        )}
        {screen === 'utility' && activeUtility && (
          <MobileUtilityView key="utility" utility={activeUtility} onBack={goBack} />
        )}
        {screen === 'project' && activeProjectId && (
          <MobileProjectView key="project" projectId={activeProjectId} onBack={goBack} />
        )}
      </AnimatePresence>
    </div>
  )
}
