import { PropsWithChildren } from 'react'
import { Theme } from '..'
import { Header } from './Header'
import * as S from './styles'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Theme>
      <Header />
      <S.Main>{children}</S.Main>
    </Theme>
  )
}
