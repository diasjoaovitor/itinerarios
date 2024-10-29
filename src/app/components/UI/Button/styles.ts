import styled from 'styled-components'
import { theme, TPalette } from '@/styles'

export const ButtonContained = styled.button<{
  color?: TPalette
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

export const ButtonText = styled.button<{
  color?: TPalette
}>`
  padding: ${theme.space.xs};
  border-radius: ${theme.space.xxs};
  font-weight: ${theme.font.bold};
  color: ${(props) => {
    const key = props.color || 'primary'
    return theme.palette[key]
  }};
  background-color: transparent;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  &:hover {
    color: ${(props) => {
      const key = props.color || 'primary'
      return theme.hover(theme.palette[key])
    }};
    transition: 0.2s;
  }
`
