import { useEffect, useState } from 'react'

export const useOpen = (isOpen?: boolean) => {
  const [open, setOpen] = useState(!!isOpen)

  useEffect(() => {
    setOpen(!!isOpen)
  }, [isOpen])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((open) => !open)
  }

  return {
    open,
    handleOpen,
    handleClose,
    handleToggle
  }
}
