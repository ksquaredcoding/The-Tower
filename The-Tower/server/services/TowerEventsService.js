import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { ticketsService } from "./TicketsService.js"

class TowerEventsService {
  async getAllEvents() {
    const events = await dbContext.TowerEvents.find().populate('creator', 'name picture').populate('tickets')
    return events
  }

  async getEventById(eventId) {
    const event = await dbContext.TowerEvents.findById(eventId).populate('creator', 'name picture').populate('tickets')
    if (!event) {
      throw new BadRequest('Invalid or Bad Event Id')
    }
    return event
  }

  async getEventIfNotCanceled(eventId) {
    const event = await this.getEventById(eventId)
    if (event.isCanceled) {
      throw new BadRequest('The event has been canceled')
    }
    return event
  }

  async createEvent(eventData) {
    const event = await dbContext.TowerEvents.create(eventData)
    await event.populate('creator', 'name picture')
    await event.populate('tickets')
    return event
  }

  async editEvent(eventId, eventData, userId) {
    const event = await this.getEventIfNotCanceled(eventId)
    // @ts-ignore
    if (event.creatorId.toString() !== userId) {
      throw new Forbidden("You can't edit events that aren't yours.")
    }
    event.name = eventData.name || event.name
    event.description = eventData.description || event.description
    event.coverImg = eventData.coverImg || event.coverImg
    event.location = eventData.location || event.location
    event.capacity = eventData.capacity || event.capacity
    event.startDate = eventData.startDate || event.startDate
    event.type = eventData.type || event.type

    await event.save()
    return event
  }

  async cancelEvent(eventId, userId) {
    const event = await this.getEventById(eventId)
    // @ts-ignore
    if (event.creatorId.toString() !== userId) {
      throw new Forbidden("You can't cancel events that aren't yours.")
    }
    if (event.isCanceled == false) {
      event.isCanceled = true
      await event.save()
      return event
    } else {
      event.isCanceled = false
      await event.save()
      return event
    }
  }
}

export const towerEventsService = new TowerEventsService()