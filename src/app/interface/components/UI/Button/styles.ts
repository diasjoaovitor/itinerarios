import styled from 'styled-components'
import { theme } from '@/styles'
import { TColor } from './types'

export const Button = styled.button<{
  color?: TColor
}>`
  padding: ${theme.space.xs};
  border-radius: ${theme.space.xxs};
  font-weight: ${theme.font.bold};
  background-color: ${(props) => {
    const key = props.color || 'primary'
    return theme.palette[key]
  }};
  color: ${theme.palette.text};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => {
      const key = props.color || 'primary'
      return theme.hover(theme.palette[key])
    }};
    transition: 0.2s;
  }
`
