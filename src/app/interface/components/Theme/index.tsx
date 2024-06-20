import { PropsWithChildren } from 'react'
import * as S from './styles'

export const Theme = ({ children }: PropsWithChildren) => {
  return (
    <S.Wrapper>
      <S.ResetCSS />
      {children}
    </S.Wrapper>
  )
}
