import { useState, useLayoutEffect } from 'react'
import type { Platform } from '@/types'
import { detectPlatform } from '@/lib/utils'

export function usePlatform(): Platform {
  const [platform, setPlatform] = useState<Platform>('desktop')

  // useLayoutEffect (not useEffect) so the real platform is resolved before the
  // browser paints — avoids a flash of the wrong shell on tablet/mobile first load.
  useLayoutEffect(() => {
    let raf = 0
    const update = () => setPlatform(detectPlatform())
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()

    window.addEventListener('resize', onResize)
    const pointer = window.matchMedia('(pointer: coarse)')
    pointer.addEventListener('change', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      pointer.removeEventListener('change', onResize)
    }
  }, [])

  return platform
}
