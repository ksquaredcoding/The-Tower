import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { towerEventsService } from "../services/TowerEventsService.js"

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
  }

  async getAllEvents(req, res, next) {
    try {
      const events = await towerEventsService.getAllEvents()
      res.send(events)
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
}