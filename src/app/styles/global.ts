import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    height: 100vh;
    width: 100vw;
    background-color: ${theme.palette.bg};
    color: ${theme.palette.text};
  }
`
