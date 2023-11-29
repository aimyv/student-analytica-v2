import { Inter } from 'next/font/google'
import './globals.css'
import TanStackProvider from './ui/providers/TanStackProvider'
import SideNav from './ui/sidenav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    template: '%s | Student Analytica',
    default: 'Student Analytica',
  },
  description: 'A Student Analytics Dashboard.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <TanStackProvider>
        <body className={inter.className}>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
          </div>
        </body>
      </TanStackProvider>
    </html>
  )
}
