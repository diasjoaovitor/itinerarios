import { IoMdAdd } from 'react-icons/io'
import { useFocus } from '@/hooks'
import { HelperText, IconButton, Select, SelectProps } from '@/components'
import { theme } from '@/styles'
import * as S from './styles'

type IconSelectProps = {
  label: string
  handleClick(): void
  helperText?: string
} & SelectProps

export const IconSelect = (props: IconSelectProps) => {
  const { label, handleClick, helperText, id, ...rest } = props
  const { color, handleBlur, handleFocus } = useFocus(
    theme.palette.subtext,
    theme.palette.primary
  )

  return (
    <S.Wrapper $color={color}>
      <label htmlFor={id}>{label}</label>
      <S.SelectWrapper color={color}>
        <Select {...rest} id={id} onFocus={handleFocus} onBlur={handleBlur} />
        <IconButton handleClick={handleClick}>
          <IoMdAdd fontSize={24} />
        </IconButton>
      </S.SelectWrapper>
      {helperText && <HelperText>{helperText}</HelperText>}
    </S.Wrapper>
  )
}
