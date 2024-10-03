import { PositionService } from '@/services'
import { handleRequest } from '@/utils'

const positionService = new PositionService()

export const GET = async (_: Request, context: { params: { id: string } }) => {
  return handleRequest(async () => {
    const id = context.params.id
    return await positionService.findOne(Number(id))
  })
}

export const DELETE = async (
  _: Request,
  context: { params: { id: string } }
) => {
  return handleRequest(async () => {
    const id = context.params.id
    await positionService.delete(Number(id))
  })
}

export const PUT = async (request: Request) => {
  return handleRequest(async () => {
    const body = await request.json()
    await positionService.update(body)
  })
}
