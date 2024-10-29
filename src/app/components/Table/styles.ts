import styled from 'styled-components'
import { theme } from '@/styles'

export const Wrapper = styled.div`
  > a {
    margin-bottom: ${theme.space.sm};
  }
  table,
  th,
  td {
    border: 1px solid ${theme.palette.text};
    border-collapse: collapse;
    padding: ${theme.space.xxs};
  }
  table {
    width: 100%;
    text-align: center;
  }
  tbody tr {
    cursor: pointer;
    &:hover {
      background-color: ${theme.hover(theme.palette.bg)};
      transition: 0.2s;
    }
  }
`
