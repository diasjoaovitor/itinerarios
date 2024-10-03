import { ItineraryService } from '@/services'
import { handleRequest } from '@/utils'

const itineraryService = new ItineraryService()

export const GET = async () => {
  return handleRequest(itineraryService.find)
}

export const POST = async (request: Request) => {
  return handleRequest(async () => {
    const body = await request.json()
    return await itineraryService.create(body)
  })
}

export const PUT = async (request: Request) => {
  return handleRequest(async () => {
    const body = await request.json()
    await itineraryService.update(body)
  })
}
