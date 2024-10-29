import { InputHTMLAttributes } from 'react'
import { useFocus } from '@/hooks'
import { theme } from '@/styles'
import { HelperText } from '../HelperText'
import * as S from './styles'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  flex?: boolean
  helperText?: string
}

export const TextField = (props: TextFieldProps) => {
  const { color, handleBlur, handleFocus } = useFocus(
    theme.palette.subtext,
    theme.palette.primary
  )
  const { label, flex, helperText, id, ...rest } = props
  return (
    <S.Wrapper $color={color} $flex={!!flex}>
      <label htmlFor={id || props.name}>
        {!props.required ? label : `${label} *`}
      </label>
      <input
        {...rest}
        id={id || props.name}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {helperText && <HelperText>{helperText}</HelperText>}
    </S.Wrapper>
  )
}
