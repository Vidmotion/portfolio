'use client'

import { AnimatePresence } from 'framer-motion'
import { useMobileStore } from '@/store/mobileStore'
import { MobileLockScreen } from './MobileLockScreen'
import { MobileHomeScreen } from './MobileHomeScreen'
import { MobileAppView } from './MobileAppView'
import { MobileProjectView } from './MobileProjectView'
import { MobileUtilityView } from './MobileUtilityView'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { WallpaperLayer } from '@/components/os/WallpaperLayer'
import { useDesktopStore } from '@/store/desktopStore'
import { playlist } from '@/core/registries/playlist'

export function MobileShell() {
  const wallpaper = useDesktopStore((s) => s.wallpaper)
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
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'var(--font-text)',
      }}
      role="main"
      aria-label="Mobile — iOS experience"
    >
      <WallpaperLayer wallpaper={wallpaper} />
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
            color: '#fff',
            background: '#000',
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
            onContact={() => openUtility('message')}
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
