import { ItineraryService } from '@/services'
import { handleRequest } from '@/utils'

const itineraryService = new ItineraryService()

export const GET = async (_: Request, context: { params: { id: string } }) => {
  return handleRequest(
    async () => await itineraryService.findOne(context.params.id)
  )
}

export const DELETE = async (
  _: Request,
  context: { params: { id: string } }
) => {
  return handleRequest(async () => {
    const id = context.params.id
    await itineraryService.delete(Number(id))
  })
}

export const PUT = async (request: Request) => {
  return handleRequest(async () => {
    const body = await request.json()
    await itineraryService.update(body)
  })
}
