import { createElement } from 'react'
import styled from 'styled-components'
import { theme } from '@/styles'
import { TypographyProps } from './types'

export const Styled = styled((props: TypographyProps) => {
  const { component, variant, children, ...rest } = props
  return createElement(component || 'span', rest, children)
})`
  font-size: ${(props) => theme.font[props.variant || 'xs']};
`
