import styled from 'styled-components'
import { theme } from '@/styles'

export const Wrapper = styled.div<{ $color: string; $flex: boolean }>`
  ${(props) => props.$flex && `display: flex; gap: ${theme.space.xs};`};
  label {
    display: block;
    margin-bottom: 0.2rem;
    color: ${(props) => props.$color};
  }
  input {
    width: ${(props) => (!props.$flex ? '100%' : 'auto')};
    font-size: ${theme.font.xs};
    padding: ${theme.space.xs} ${theme.space.xxs};
    border-radius: ${theme.space.xxs};
    border: 2px solid ${theme.palette.paper};
    outline: none;
    &:focus {
      border-color: ${theme.palette.primary};
    }
  }
`
