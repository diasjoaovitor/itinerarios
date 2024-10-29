import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { TButtonVariant, TPalette } from '@/styles'
import * as S from './styles'

export const Button = (
  props: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
    color?: TPalette
    variant?: TButtonVariant
  }
) => {
  const { variant, ...rest } = props
  return variant === 'text' ? (
    <S.ButtonText {...rest} type={props.type || 'button'} />
  ) : (
    <S.ButtonContained {...rest} type={props.type || 'button'} />
  )
}
