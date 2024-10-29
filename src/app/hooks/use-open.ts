import { useCallback, useEffect, useState } from 'react'

export const useOpen = (isOpen?: boolean) => {
  const [open, setOpen] = useState(!!isOpen)

  useEffect(() => {
    setOpen(!!isOpen)
  }, [isOpen])

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleToggle = useCallback(() => {
    setOpen((open) => !open)
  }, [])

  return {
    open,
    handleOpen,
    handleClose,
    handleToggle
  }
}
