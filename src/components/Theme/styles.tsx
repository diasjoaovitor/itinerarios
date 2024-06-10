import styled from 'styled-components'
import { theme } from '@/styles'

export const ResetCSS = () => (
  <style jsx global>{`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html,
    body {
      height: 100vh;
      width: 100vw;
    }
  `}</style>
)

export const Wrapper = styled.div`
  color: ${theme.palette.text};
`
