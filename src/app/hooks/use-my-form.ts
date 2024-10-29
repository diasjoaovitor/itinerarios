import { useCallback, useState } from 'react'
import { AnyObjectSchema, ValidationError } from 'yup'

type TKeys<T> = T extends Record<infer K, any> ? K : never

export const useMyForm = <T>({
  schema,
  keys
}: {
  schema: AnyObjectSchema
  keys: string[]
}) => {
  type TObject = Record<TKeys<T>, string>

  const [errors, setErrors] = useState<TObject>({} as any)

  const reset = useCallback(
    (values: T) => {
      setErrors({} as any)
      keys.forEach((key) => {
        const input = document.querySelector(`input[name="${key}"]`)
        if (!input) return
        ;(input as HTMLInputElement).value = (values as any)[key]
      })
    },
    [keys]
  )

  const handleMyFormSubmit = async (formData: FormData) => {
    let data: T = {} as any
    keys.forEach((key) => {
      data = { ...data, [key]: formData.get(key) as string }
    })
    let isValid = false
    await schema
      .validate(data)
      .then(() => {
        isValid = true
      })
      .catch((error: ValidationError) => {
        const { path } = error
        if (!path) return
        setErrors({
          [path]: error.message
        } as any)
        const input = document.querySelector(`input[name="${path}"]`)
        if (!input) return
        ;(input as HTMLInputElement).focus()
      })
    return isValid ? data : null
  }

  return { errors, reset, handleMyFormSubmit }
}
