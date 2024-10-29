import NextLink from 'next/link'
import styled from 'styled-components'
import { theme } from '@/styles'
import { LinkProps } from './types'

export const Styled = styled((props: LinkProps) => {
  const { active, children, ...rest } = props
  return <NextLink {...rest}>{children}</NextLink>
})`
  font-size: ${(props) => theme.font[props.variant || 'xs']};
  color: ${theme.palette.text};
  text-decoration: ${(props) => (!props.active ? 'none' : 'underline')};
  &:hover {
    color: ${theme.hover(theme.palette.text)};
    transition: 0.2s;
  }
`
