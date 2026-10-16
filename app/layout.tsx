import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { identity } from '@/core/registries/identity'
import { profile } from '@/core/registries/profile'
import { siteUrl, absoluteUrl } from '@/lib/seo'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Carlo Desantis | UX/UI, Web Development & Creative Direction',
  description: profile.seo.description.en,
  applicationName: identity.productName,
  authors: [{ name: identity.name, url: siteUrl }],
  creator: identity.name,
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
  openGraph: {
    title: 'Carlo Desantis — Creative & Digital Designer',
    description: profile.seo.description.en,
    type: 'website',
    url: siteUrl,
    siteName: identity.name,
    locale: 'en_GB',
    images: [
      {
        url: absoluteUrl('/social-preview.png'),
        width: 1200,
        height: 630,
        alt: 'Carlo Desantis — UX/UI, web development and creative direction',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: identity.name,
    description: profile.seo.description.en,
    images: [absoluteUrl('/social-preview.png')],
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
