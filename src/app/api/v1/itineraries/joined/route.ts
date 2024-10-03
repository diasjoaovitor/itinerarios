import { ItineraryService } from '@/services'
import { handleRequest } from '@/utils'

const itineraryService = new ItineraryService()

export const GET = async () => {
  return handleRequest(async () => await itineraryService.joinAllTables())
}
