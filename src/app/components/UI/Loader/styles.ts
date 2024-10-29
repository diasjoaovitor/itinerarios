import styled, { keyframes } from 'styled-components'
import { theme } from '@/styles'
import { TbCalendarTime } from 'react-icons/tb'

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
  `

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: ${theme.palette.paper};
`

export const Animation = styled(TbCalendarTime)`
  animation: ${blink} 1s steps(10, end) infinite;
`
