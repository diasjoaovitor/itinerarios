import { HTMLAttributes } from 'react'
import * as S from './styles'

export type SelectProps = {
  options: {
    value: string
    label: string
  }[]
  name: string
} & HTMLAttributes<HTMLSelectElement>

export const Select = (props: SelectProps) => {
  const { options, ...rest } = props
  return (
    <S.Select {...rest}>
      {options.map(({ value, label }) => {
        return (
          <option key={value} value={value}>
            {label}
          </option>
        )
      })}
    </S.Select>
  )
}
