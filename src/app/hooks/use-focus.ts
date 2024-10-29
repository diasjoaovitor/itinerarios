import { useState } from 'react'

export const useFocus = (c1: string, c2: string) => {
  const [color, setColor] = useState(c1)

  const handleFocus = () => {
    setColor(c2)
  }

  const handleBlur = () => {
    setColor(c1)
  }

  return { color, handleFocus, handleBlur }
}
