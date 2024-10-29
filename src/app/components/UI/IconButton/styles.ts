import styled from 'styled-components'
import { theme, TPalette } from '@/styles'

export const Button = styled.button<{ $bgColor?: TPalette }>`
  cursor: pointer;
  border: none;
  color: ${theme.palette.text};
  background-color: ${({ $bgColor }) =>
    !$bgColor ? theme.palette.bg : theme.palette[$bgColor]};
  &:hover {
    background-color: ${({ $bgColor }) =>
      theme.hover(!$bgColor ? theme.palette.bg : theme.palette[$bgColor])};
    transition: 0.2s;
  }
`
