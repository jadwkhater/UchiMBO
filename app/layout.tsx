import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar' // <-- 1. Import it here

export const metadata: Metadata = {
  title: 'UChicago Music Business',
  description: 'Pre-professional student organization at the University of Chicago. Serious about the business. Obsessed with the music.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* <-- 2. Place it above children */}
        {children}
      </body>
    </html>
  )
}