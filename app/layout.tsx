import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import UtmifyScripts from '@/components/utmify-scripts'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'La Era de la Abundancia',
  description: 'Comienza tu viaje de manifestación',
}

export const viewport: Viewport = {
  themeColor: '#000000',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);` }} />
        <link rel="preload" href="https://scripts.converteai.net/f8e465b5-f483-4d08-be19-bc14de388e59/players/6a087eb0dca0bf66780c5301/v4/player.js" as="script" />
        <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
        <link rel="preload" href="https://cdn.converteai.net/f8e465b5-f483-4d08-be19-bc14de388e59/6a087e61dca0bf66780c52b2/main.m3u8" as="fetch" />
        <link rel="dns-prefetch" href="https://cdn.converteai.net" />
        <link rel="dns-prefetch" href="https://scripts.converteai.net" />
        <link rel="dns-prefetch" href="https://images.converteai.net" />
        <link rel="dns-prefetch" href="https://api.vturb.com.br" />
        <link rel="dns-prefetch" href="https://license.vturb.com" />
      </head>
      <body className="font-sans antialiased bg-[#0a0a0a] text-[#f5f5f5]" suppressHydrationWarning>
        {children}
        <Analytics />
        <UtmifyScripts />
      </body>
    </html>
  )
}
