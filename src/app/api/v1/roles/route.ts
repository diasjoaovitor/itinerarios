import { handleRequest } from '@/api/handlers'
import { addRole, getRoles, updateRole } from '../../../queries'

export const GET = async () => {
  return handleRequest(getRoles)
}

export const POST = async (request: Request) => {
  return handleRequest(async () => {
    const body = await request.json()
    return addRole(body)
  })
}

export const PUT = async (request: Request) => {
  return handleRequest(async () => {
    const body = await request.json()
    return updateRole(body)
  })
}
