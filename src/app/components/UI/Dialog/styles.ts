import { theme } from '@/styles'
import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  padding: ${theme.space.md};
  top: 0;
  left: 0;
  background-color: ${theme.palette.overlay};
`

export const Content = styled.div`
  padding: ${theme.space.xs};
  background-color: ${theme.palette.paper};
  border-radius: ${theme.space.xxs};
`

export const Grid = styled.div`
  margin-top: ${theme.space.xs};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.space.xs};
`
