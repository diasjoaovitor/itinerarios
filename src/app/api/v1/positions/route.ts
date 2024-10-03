import { PositionService } from '@/services'
import { handleRequest } from '@/utils'

const positionService = new PositionService()

export const GET = async () => {
  return handleRequest(positionService.find)
}

export const POST = async (request: Request) => {
  return handleRequest(async () => {
    const body = await request.json()
    return await positionService.create(body)
  })
}

export const PUT = async (request: Request) => {
  return handleRequest(async () => {
    const body = await request.json()
    await positionService.update(body)
  })
}
