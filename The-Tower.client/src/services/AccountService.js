import { AppState } from '../AppState'
import { Attendee } from "../models/Attendee.js"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getMyTickets() {
    const res = await api.get('account/tickets')
    AppState.accountTickets = res.data.map(t => new Attendee(t))
  }
}

export const accountService = new AccountService()
