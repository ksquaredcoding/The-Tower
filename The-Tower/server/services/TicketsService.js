import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { towerEventsService } from "./TowerEventsService.js"

class TicketsService {
  async getTicketsByEvent(eventId) {
    const event = await towerEventsService.getEventIfNotCanceled(eventId)
    if (event) {
      const tickets = await dbContext.Tickets.find({ eventId }).populate('account', 'name picture').populate('towerEvent')
      return tickets
    }
  }

  async getMyTickets(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId }).populate('account', 'name picture').populate('towerEvent')
    return tickets
  }

  async getTicketById(ticketId) {
    const ticket = await dbContext.Tickets.findById(ticketId).populate('account', 'name picture').populate('towerEvent')
    if (!ticket) {
      throw new BadRequest('Invalid or Bad ticket Id')
    }
    return ticket
  }

  async createTicket(ticketData) {
    const event = await towerEventsService.getEventIfNotCanceled(ticketData.eventId)
    if (event.capacity == 0) {
      throw new BadRequest("Event is at capacity. Ticket cannot be created.")
    }
    const ticket = await dbContext.Tickets.create(ticketData)
    // @ts-ignore
    event.capacity--
    await event.save()
    await ticket.populate('account', 'name picture')
    await ticket.populate('towerEvent')
    return ticket
  }

  async deleteTicket(ticketId, userId) {
    const ticket = await this.getTicketById(ticketId)
    // @ts-ignore
    const event = await towerEventsService.getEventIfNotCanceled(ticket.eventId.toString())
    // @ts-ignore
    if (ticket.accountId.toString() !== userId) {
      throw new Forbidden("You can't delete tickets that aren't yours.")
    }
    await ticket.remove()
    // @ts-ignore
    event.capacity++
    await event.save()
    return ticket
  }
}

export const ticketsService = new TicketsService()