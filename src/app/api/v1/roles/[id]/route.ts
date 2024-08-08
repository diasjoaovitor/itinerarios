import { deleteRole, getRole, updateRole } from '../../../../queries'
import { handleRequest } from '@/api/handlers'

export const GET = async (_: Request, context: { params: { id: string } }) => {
  return handleRequest(async () => {
    const id = context.params.id
    return await getRole(id)
  })
}

export const DELETE = async (
  _: Request,
  context: { params: { id: string } }
) => {
  return handleRequest(async () => {
    const id = context.params.id
    return await deleteRole(id)
  })
}

export const PUT = async (request: Request) => {
  return handleRequest(async () => {
    const body = await request.json()
    return updateRole(body)
  })
}
