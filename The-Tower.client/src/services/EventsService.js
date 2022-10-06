import { AppState } from "../AppState.js"
import { Attendee } from "../models/Attendee.js";
import { TowerEvent } from "../models/TowerEvent.js";
import { api } from "./AxiosService.js"


class EventsService {
  async getAllEvents() {
    const res = await api.get('/api/events')
    AppState.events = res.data.map(e => new TowerEvent(e))
    console.log(AppState.events);
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

  async attendEvent(eventData) {
    const res = await api.post('/api/tickets', eventData)
    const attendee = new Attendee(res.data)
    AppState.attendees.push(attendee)
  }
}

export const eventsService = new EventsService()