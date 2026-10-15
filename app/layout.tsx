import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { identity } from '@/core/registries/identity'
import { profile } from '@/core/registries/profile'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio.carlodesantis.com'),
  title: profile.seo.title,
  description: profile.seo.description.en,
  alternates: { canonical: '/' },
  openGraph: {
    title: identity.name,
    description: profile.seo.description.en,
    type: 'website',
    url: '/',
    siteName: 'Carlo Desantis — Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: profile.seo.title,
    description: profile.seo.description.en,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
