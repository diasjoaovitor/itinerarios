import styled from 'styled-components'
import { theme } from '@/styles'

export const Wrapper = styled.form`
  max-width: 600px;
  margin: auto;
  padding: ${theme.space.xs};
  border-radius: ${theme.space.xxs};
  border: 2px solid ${theme.palette.paper};
  background-color: ${theme.palette.paper};
  > div {
    margin-bottom: ${theme.space.xs};
  }
  button[type='submit'] {
    width: 100%;
  }
  > button[type='button'] {
    margin-top: ${theme.space.xs};
  }
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.space.xs};
  margin-bottom: ${theme.space.xs};
`
