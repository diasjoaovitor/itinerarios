import styled from 'styled-components'
import { theme } from '@/styles'
import { Link } from '../UI/Link'

export const Header = styled.header`
  background-color: ${theme.palette.paper};
  padding: ${theme.space.xs};
`

export const Container = styled.div`
  max-width: ${theme.device.desktop};
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.space.xxs};
  @media (max-width: ${theme.device.mobile}) {
    flex-direction: column;
  }
`

export const Title = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.space.xxs};
  border-radius: 2px;
  &:hover {
    color: ${theme.palette.text};
  }
`

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${theme.space.xxs};
  border-radius: 2px;
`

export const Main = styled.main`
  max-width: ${theme.device.desktop};
  margin: auto;
  padding: ${theme.space.sm} ${theme.space.xs};
`
