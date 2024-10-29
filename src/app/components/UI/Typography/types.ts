import { HTMLAttributes } from 'react'
import { TFontVariant } from '@/styles'

export type TypographyProps = HTMLAttributes<HTMLElement> & {
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  variant?: TFontVariant
}
