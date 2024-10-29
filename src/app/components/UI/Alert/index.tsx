import { useEffect } from 'react'
import { delay } from 'bluebird'
import { useOpen } from '@/hooks'
import { Typography } from '../Typography'
import { TAlertProps } from './types'
import * as S from './styles'

export const Alert = ({ open: isOpen, severity, title }: TAlertProps) => {
  const { open, handleClose } = useOpen(isOpen)

  useEffect(() => {
    ;(async () => {
      await delay(5000)
      handleClose()
    })()
  }, [handleClose])

  if (!open) return null

  return (
    <S.Wrapper severity={severity}>
      <Typography component="h3" variant="xs">
        {title}
      </Typography>
    </S.Wrapper>
  )
}
