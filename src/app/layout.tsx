import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { StyledComponentsRegistry } from './lib'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Itinerários',
  description: 'Sistema para gestão de horários de funcionários'
}

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="pt-br" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

export default RootLayout
