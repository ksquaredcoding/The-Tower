import { AppState } from "../AppState.js"
import { Attendee } from "../models/Attendee.js";
import { TowerComment } from "../models/TowerComment.js";
import { TowerEvent } from "../models/TowerEvent.js";
import { api } from "./AxiosService.js"


class EventsService {
  async getAllEvents() {
    const res = await api.get('/api/events')
    AppState.events = res.data.map(e => new TowerEvent(e))
  }

  async getEventById(id) {
    const res = await api.get(`/api/events/${id}`)
    AppState.activeEvent = new TowerEvent(res.data)
  }

  async getEventAttendees(id) {
    AppState.attendees = []
    const res = await api.get(`/api/events/${id}/tickets`)
    AppState.attendees = res.data.map(a => new Attendee(a))
  }

  async getEventComments(id) {
    AppState.comments = []
    const res = await api.get(`/api/events/${id}/comments`)
    AppState.comments = res.data.map(c => new TowerComment(c))
  }

  async attendEvent(eventData) {
    const res = await api.post('/api/tickets', eventData)
    const attendee = new Attendee(res.data)
    AppState.attendees.push(attendee)
    AppState.activeEvent.capacity--
  }

  async cancelTicket(attendeeId) {
    await api.delete(`api/tickets/${attendeeId}`)
    AppState.attendees = AppState.attendees.filter(a => a.id !== attendeeId)
    AppState.activeEvent.capacity++
  }

  async cancelEvent(eventId) {
    await api.delete(`api/events/${eventId}`)
    AppState.activeEvent.isCanceled = true
  }
}

export const eventsService = new EventsService()