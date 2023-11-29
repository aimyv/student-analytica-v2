import { Inter } from 'next/font/google'
import './globals.css'
import TanStackProvider from './ui/providers/TanStackProvider'

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
        <body className={inter.className}>{children}</body>
      </TanStackProvider>
    </html>
  )
}
