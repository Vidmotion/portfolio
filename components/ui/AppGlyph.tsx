'use client'

import Image from 'next/image'
import { icons, iconSource, type IconId } from '@/core/registries/icons'

/** Shared masters, optical scale and Retina rendering across the three shells. */
export function AppGlyph({ icon, className }: { icon: IconId; className?: string }) {
  return (
    <Image
      data-app-glyph=""
      data-icon-id={icon}
      src={iconSource(icon)}
      alt=""
      width={432}
      height={432}
      unoptimized
      draggable={false}
      className={className}
      style={{
        width: `${icons[icon].scale * 100}%`,
        height: `${icons[icon].scale * 100}%`,
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        pointerEvents: 'none',
      }}
    />
  )
}
