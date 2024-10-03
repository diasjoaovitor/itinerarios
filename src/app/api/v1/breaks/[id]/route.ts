import { BreakService } from '@/services'
import { handleRequest } from '@/utils'

const breakService = new BreakService()

export const GET = async (_: Request, context: { params: { id: string } }) => {
  return handleRequest(async () => {
    const id = context.params.id
    return await breakService.findOne(Number(id))
  })
}

export const DELETE = async (
  _: Request,
  context: { params: { id: string } }
) => {
  return handleRequest(async () => {
    const id = context.params.id
    await breakService.delete(Number(id))
  })
}

export const PUT = async (request: Request) => {
  return handleRequest(async () => {
    const body = await request.json()
    await breakService.update(body)
  })
}
