import NextLink from 'next/link'
import styled from 'styled-components'
import { theme } from '@/styles'
import { LinkProps } from './types'

export const Styled = styled((props: LinkProps) => <NextLink {...props} />)`
  text-decoration: none;
  padding: ${theme.space.xs};
  border-radius: ${theme.space.xxs};
  font-weight: ${theme.font.bold};
  background-color: ${(props) => {
    const key = props.color || 'primary'
    return theme.palette[key]
  }};
  color: ${theme.palette.text};
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  display: inline-block;
  &:hover {
    background-color: ${(props) => {
      const key = props.color || 'primary'
      return theme.hover(theme.palette[key])
    }};
    transition: 0.2s;
  }
`
