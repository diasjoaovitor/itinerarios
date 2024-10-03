import { BaseRequest } from '@/classes'
import { TItineraryModel } from '@/models'

export class ItineraryRequest extends BaseRequest<TItineraryModel> {
  constructor() {
    super('/itineraries')
  }
}
