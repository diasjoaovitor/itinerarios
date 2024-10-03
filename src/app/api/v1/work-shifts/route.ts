import { WorkShiftService } from '@/services'
import { handleRequest } from '@/utils'

const workShiftService = new WorkShiftService()

export const GET = async () => {
  return handleRequest(workShiftService.find)
}

export const POST = async (request: Request) => {
  return handleRequest(async () => {
    const body = await request.json()
    return await workShiftService.create(body)
  })
}

export const PUT = async (request: Request) => {
  return handleRequest(async () => {
    const body = await request.json()
    await workShiftService.update(body)
  })
}
