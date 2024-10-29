import { LinkHTMLAttributes } from 'react'
import { TFontVariant } from '@/styles'

export type LinkProps = LinkHTMLAttributes<HTMLAnchorElement> & {
  href: string
  active?: boolean
  variant?: TFontVariant
}
