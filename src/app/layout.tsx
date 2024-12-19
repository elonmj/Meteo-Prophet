import './globals.css'
import { Providers } from './provider'
import { Header } from '@/components/ui/layout/Header'
import { Footer } from '@/components/ui/layout/Footer'
import { MobileNav } from '@/components/ui/layout/MobileNav'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <MobileNav />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}