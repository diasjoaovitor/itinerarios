import styled from 'styled-components'
import { theme, TPalette } from '@/styles'

export const Button = styled.button<{ bgColor?: TPalette }>`
  cursor: pointer;
  border: none;
  color: ${theme.palette.text};
  background-color: ${({ bgColor }) => (!bgColor ? theme.palette.bg : bgColor)};
  &:hover {
    background-color: ${theme.hover(theme.palette.paper)};
    transition: 0.2s;
  }
`
