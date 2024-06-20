import { createElement } from 'react'
import styled from 'styled-components'
import { theme } from '@/styles'
import { TypographyProps } from '../types'

const Styled = styled((props: TypographyProps) =>
  createElement(props.component || 'span', {
    ...props.inputProps,
    children: props.children,
    className: props.className
  })
)`
  font-size: ${(props) => theme.font[props.variant || 'xs']};
`
export const Typography = (props: TypographyProps) => {
  return <Styled {...props} />
}
