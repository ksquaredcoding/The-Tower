import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { towerEventsService } from "../services/TowerEventsService.js"
import { ticketsService } from "../services/TicketsService.js"

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/tickets', this.getEventTickets)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.cancelEvent)
  }

  async getAllEvents(req, res, next) {
    try {
      const events = await towerEventsService.getAllEvents()
      res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const event = await towerEventsService.getEventById(req.params.eventId)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getEventTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getTicketsByEvent(req.params.eventId)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await towerEventsService.createEvent(req.body)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      const event = await towerEventsService.editEvent(req.params.eventId, req.body, req.userInfo.id)
      res.send(event)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const event = await towerEventsService.cancelEvent(req.params.eventId, req.userInfo.id)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
}