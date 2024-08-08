import { baseURL } from '@/constants'

export const request = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(`${baseURL}${endpoint}`, options)
  const data = await response.json()
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return data
}
