import { LinkHTMLAttributes } from 'react'
import { TPalette } from '@/styles'

export type LinkProps = LinkHTMLAttributes<HTMLAnchorElement> & {
  href: string
  color?: TPalette
}
