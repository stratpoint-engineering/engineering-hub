import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { GeistMono } from 'geist/font/mono'
import { Inter } from 'next/font/google'
import AuthButton from '@/components/AuthButton'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  title: {
    template: '%s — Stratpoint Engineering Hub'
  },
  description: 'Stratpoint Engineering Hub — guidelines, golden paths, and best practices for every engineering domain.',
  applicationName: 'Engineering Hub',
  icons: {
    icon: '/stratpoint_icon.svg',
    shortcut: '/stratpoint_icon.svg',
  }
}

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <img
      src="/stratpoint_icon.svg"
      alt="Stratpoint"
      style={{ height: '36px', width: 'auto' }}
    />
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
      <span className="nx-logo-text-main">Stratpoint</span>
      <span className="nx-logo-text-sub">Engineering Hub</span>
    </div>
  </div>
)

export default async function RootLayout({ children }) {
  const navbar = <Navbar logo={<Logo />}><AuthButton /></Navbar>
  const pageMap = await getPageMap()

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${inter.variable} ${GeistMono.variable}`}>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/stratpoint_icon.svg" />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          footer={
            <Footer>
              © {new Date().getFullYear()} Stratpoint Technologies, Inc. — Systems Engineering
            </Footer>
          }
          docsRepositoryBase="https://github.com/stratpoint-engineering/engineering-hub"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          nextThemes={{ defaultTheme: 'dark' }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
