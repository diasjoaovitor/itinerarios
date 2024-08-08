import styled from 'styled-components'
import { theme } from '@/styles'
import { TAlertSeverity } from './types'

export const Wrapper = styled.div<{ severity: TAlertSeverity }>`
  border: 2px solid
    ${(props) =>
      props.severity === 'error' ? theme.palette.error : theme.palette.primary};
  padding: ${theme.space.xs};
  border-radius: ${theme.space.xxs};
  position: fixed;
  top: ${theme.space.xs};
  right: ${theme.space.xs};
  background-color: ${theme.palette.bg};
  min-width: 180px;
`
