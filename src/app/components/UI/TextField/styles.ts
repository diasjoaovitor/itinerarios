import styled from 'styled-components'
import { theme } from '@/styles'

export const Wrapper = styled.div<{ color: string }>`
  label {
    display: block;
    margin-bottom: 0.2rem;
    color: ${(props) => props.color};
  }
  input {
    width: 100%;
    font-size: ${theme.font.xs};
    padding: ${theme.space.xs} ${theme.space.xxs};
    border-radius: ${theme.space.xxs};
    border: 2px solid ${theme.palette.paper};
    outline: none;
    &:focus {
      border-color: ${theme.palette.primary};
    }
  }
  p {
    margin-top: 0.2rem;
    font-size: ${theme.font.xs};
    color: ${theme.palette.error};
  }
`
