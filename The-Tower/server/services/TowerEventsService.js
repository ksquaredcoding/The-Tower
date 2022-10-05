import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TowerEventsService {
  async createEvent(eventData) {
    const event = await dbContext.TowerEvents.create(eventData)
    await event.populate('creator', 'name picture')
    return event
  }
  async getAllEvents() {
    const events = await dbContext.TowerEvents.find().populate('creator', 'name picture')
    return events
  }

}

export const towerEventsService = new TowerEventsService()