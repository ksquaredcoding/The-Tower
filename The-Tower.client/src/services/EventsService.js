import { AppState } from "../AppState.js"
import { Attendee } from "../models/Attendee.js";
import { TowerComment } from "../models/TowerComment.js";
import { TowerEvent } from "../models/TowerEvent.js";
import { api } from "./AxiosService.js"
import { router } from "../router.js"


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

  async bringBackEvent(eventId) {
    await api.delete(`api/events/${eventId}`)
    AppState.activeEvent.isCanceled = false
  }

  async editEvent(eventData) {
    const eventId = AppState.activeEvent?.id
    const eventIndex = AppState.events.findIndex(e => e.id == eventId)
    const res = await api.put(`/api/events/${eventId}`, eventData)
    const editedEvent = new TowerEvent(res.data)
    AppState.events.splice(eventIndex, 1, editedEvent)
    AppState.activeEvent = editedEvent
  }

  async createEvent(eventData) {
    const res = await api.post('api/events', eventData)
    const towerEvent = new TowerEvent(res.data)
    AppState.events = [towerEvent, ...AppState.events]
    AppState.activeEvent = null
    AppState.activeEvent = towerEvent
    router.push({ name: 'Details', params: { id: towerEvent.id } })
  }
}

export const eventsService = new EventsService()