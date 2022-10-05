import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"


class EventsService {
  async getAllEvents() {
    const res = await api.get('/api/events')
    AppState.events = res.data.map(e => new Event(e))
    console.log(AppState.events);
  }
}

export const eventsService = new EventsService()