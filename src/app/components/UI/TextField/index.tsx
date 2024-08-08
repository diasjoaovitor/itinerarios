import { InputHTMLAttributes } from 'react'
import { useFocus } from '@/hooks'
import { theme } from '@/styles'
import * as S from './styles'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  helperText?: string
}

export const TextField = (props: TextFieldProps) => {
  const { color, handleBlur, handleFocus } = useFocus(
    theme.palette.subtext,
    theme.palette.primary
  )
  const { label, helperText, ...rest } = props
  return (
    <S.Wrapper color={color}>
      <label htmlFor={props.id}>{!props.required ? label : `${label} *`}</label>
      <input {...rest} onFocus={handleFocus} onBlur={handleBlur} />
      {helperText && <p>{helperText}</p>}
    </S.Wrapper>
  )
}
