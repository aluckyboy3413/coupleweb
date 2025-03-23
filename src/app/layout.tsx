import type { Metadata } from 'next'
import { Inter, Dancing_Script } from 'next/font/google'
import StyledComponentsRegistry from './registry'
import ClientLayout from './ClientLayout'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing-script' })

export const metadata: Metadata = {
  title: '情侣网站 | Our Love Story',
  description: '记录我们的爱情故事和美好回忆',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dancingScript.variable} font-sans`}>
        <StyledComponentsRegistry>
          <ClientLayout>
            {children}
          </ClientLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
} 