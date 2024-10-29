import { theme } from '@/styles'
import styled from 'styled-components'

export const Select = styled.select`
  width: 100%;
  font-size: ${theme.font.xs};
  padding: ${theme.space.xs} ${theme.space.xxs};
  border-radius: ${theme.space.xxs};
  border: 2px solid ${theme.palette.paper};
  outline: none;
  &:focus {
    border-color: ${theme.palette.primary};
  }
`
