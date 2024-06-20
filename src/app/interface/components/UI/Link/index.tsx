import NextLink from 'next/link'
import styled from 'styled-components'
import { theme } from '@/styles'
import { LinkProps } from '../types'

const Styled = styled((props: LinkProps) => (
  <NextLink {...props.inputProps} href={props.href} className={props.className}>
    {props.children}
  </NextLink>
))`
  font-size: ${(props) => theme.font[props.variant || 'xs']};
  color: ${theme.palette.text};
  text-decoration: ${(props) => (!props.active ? 'none' : 'underline')};
  &:hover {
    color: ${theme.hover(theme.palette.text)};
    transition: 0.2s;
  }
`

export const Link = (props: LinkProps) => {
  return <Styled {...props} />
}
