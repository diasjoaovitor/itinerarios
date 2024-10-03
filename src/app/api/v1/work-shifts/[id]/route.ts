import { WorkShiftService } from '@/services'
import { handleRequest } from '@/utils'

const workShiftService = new WorkShiftService()

export const GET = async (_: Request, context: { params: { id: string } }) => {
  return handleRequest(async () => {
    const id = context.params.id
    return await workShiftService.findOne(Number(id))
  })
}

export const DELETE = async (
  _: Request,
  context: { params: { id: string } }
) => {
  return handleRequest(async () => {
    const id = context.params.id
    await workShiftService.delete(Number(id))
  })
}

export const PUT = async (request: Request) => {
  return handleRequest(async () => {
    const body = await request.json()
    await workShiftService.update(body)
  })
}
