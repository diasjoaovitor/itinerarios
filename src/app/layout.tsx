import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme } from '@/components'
import { StyledJsxRegistry } from './lib'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Boilerplate',
  description: 'Boilerplate para projetos Next.js'
}

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <StyledJsxRegistry>
          <Theme>{children}</Theme>
        </StyledJsxRegistry>
      </body>
    </html>
  )
}

export default RootLayout
