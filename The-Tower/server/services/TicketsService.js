import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TicketsService {
  async getTicketsByEvent(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('account', 'name picture').populate('towerEvent')
    return tickets
  }
}

export const ticketsService = new TicketsService()