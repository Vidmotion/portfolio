'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import dynamic from 'next/dynamic'
import { AppearanceController } from '@/components/ui/AppearanceController'
import { useBootAssets } from '@/hooks/useBootAssets'
import { useCustomWallpaperStore } from '@/store/customWallpaperStore'
import { useDesktopStore } from '@/store/desktopStore'
import { getWallpaper } from '@/core/registries/wallpapers'
import { BootScreen } from '@/components/os/BootScreen'
import { usePlatform } from '@/hooks/usePlatform'
import { useLocaleStore } from '@/store/localeStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useAccessibilityPreferences } from '@/hooks/useAccessibilityPreferences'
const loadDesktop = () => import('@/components/os/DesktopShell').then((m) => m.DesktopShell)
const loadTablet = () => import('@/components/tablet/TabletShell').then((m) => m.TabletShell)
const loadMobile = () => import('@/components/mobile/MobileShell').then((m) => m.MobileShell)
const DesktopShell = dynamic(loadDesktop, { ssr: false })
const TabletShell = dynamic(loadTablet, { ssr: false })
const MobileShell = dynamic(loadMobile, { ssr: false })
const EasterEggLayer = dynamic(
  () => import('@/components/ui/EasterEggLayer').then((m) => m.EasterEggLayer),
  { ssr: false }
)

export default function Home() {
  const wallpaper = useDesktopStore((s) => s.wallpaper)
  const [booted, setBooted] = useState(false)
  const [shellReady, setShellReady] = useState(false)
  const finishBoot = useCallback(() => setBooted(true), [])
  const platform = usePlatform()
  const assetsReady = useBootAssets(platform, !booted)
  const customEnabled = useDesktopStore((s) => s.customWallpaperEnabled)
  const customUrl = useCustomWallpaperStore((s) => s.url)
  const locale = useLocaleStore((s) => s.locale)
  const reducedMotion = useSettingsStore((s) => s.settings.accessibility.reducedMotion)
  useAccessibilityPreferences()
  useEffect(() => {
    // Fetch the correct shell during the existing boot animation, ready before unlock.
    const prepare =
      platform === 'mobile'
        ? loadMobile
        : platform === 'tablet'
          ? loadTablet
          : platform === 'desktop'
            ? loadDesktop
            : null
    if (prepare) void prepare().then(() => setShellReady(true))
  }, [platform])
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'user'}>
      <AppearanceController />
      {platform && !customEnabled && (
        <>
          <link
            rel="preload"
            as="image"
            type="image/avif"
            media="(max-width:767px)"
            href={getWallpaper(wallpaper).mobileAvif}
          />
          <link
            rel="preload"
            as="image"
            type="image/avif"
            media="(min-width:768px)"
            href={getWallpaper(wallpaper).avif}
          />
        </>
      )}
      {customEnabled && customUrl && <link rel="preload" as="image" href={customUrl} />}
      {/* Boot screen — shown until boot sequence completes */}
      <AnimatePresence>
        {!booted && (
          <BootScreen
            platform={platform}
            ready={shellReady && assetsReady}
            onComplete={finishBoot}
          />
        )}
      </AnimatePresence>

      {/* Desktop — macOS-inspired experience */}
      {platform === 'desktop' && (
        <div inert={!booted}>
          <DesktopShell />
        </div>
      )}

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
