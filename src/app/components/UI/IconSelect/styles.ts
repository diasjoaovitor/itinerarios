import styled from 'styled-components'
import { theme } from '@/styles'

export const Wrapper = styled.div<{ $color: string }>`
  label {
    display: block;
    margin-bottom: ${theme.space.xxs};
    color: ${(props) => props.$color};
    font-size: ${theme.font.xs};
  }
`

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  select {
    flex: 1;
    border-radius: ${theme.space.xxs} 0 0 ${theme.space.xxs};
  }
  button {
    background-color: ${theme.palette.bg};
    padding: calc(${theme.space.xs} - 0.146rem) ${theme.space.xxs};
    border-radius: 0 ${theme.space.xxs} ${theme.space.xxs} 0;
  }
`
