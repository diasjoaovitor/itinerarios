import { HTMLAttributes, ReactNode } from 'react'

type TVariant = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'hg'

export type TypographyProps = {
  children: ReactNode
  className?: string
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  variant?: TVariant
  inputProps?: Omit<HTMLAttributes<HTMLElement>, 'className'>
}

export type LinkProps = {
  children: ReactNode
  href: string
  active?: boolean
  className?: string
  variant?: TVariant
  inputProps?: Omit<HTMLAttributes<HTMLAnchorElement>, 'className'>
}
