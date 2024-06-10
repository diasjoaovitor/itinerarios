import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { TColor } from './types'
import * as S from './styles'

export const Button = (
  props: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
    color?: TColor
  }
) => {
  return <S.Button {...props} type={props.type || 'button'} />
}
