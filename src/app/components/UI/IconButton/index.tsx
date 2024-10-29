import { ReactNode } from 'react'
import { TPalette } from '@/styles'
import * as S from './styles'

type IconButtonProps = {
  children: ReactNode
  bgColor?: TPalette
  handleClick?: () => void
}

export const IconButton = ({
  children,
  bgColor,
  handleClick
}: IconButtonProps) => {
  return (
    <S.Button type="button" $bgColor={bgColor} onClick={handleClick}>
      {children}
    </S.Button>
  )
}
