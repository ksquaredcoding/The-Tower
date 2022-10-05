import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { ticketsService } from "./TicketsService.js"
import { towerEventsService } from "./TowerEventsService.js"

class CommentsService {
  async createComment(commentData) {
    // commentData.isAttending = this.isAttendingEvent(commentData.eventId, commentData.creatorId)
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    await comment.populate('event', 'name location startDate type')
    return comment
  }

  async getCommentById(commentId) {
    const comment = await dbContext.Comments.findById(commentId).populate('creator', 'name picture').populate('event', 'name location startDate type')
    if (!comment) {
      throw new BadRequest('Invalid or Bad comment Id')
    }
    return comment
  }

  async deleteComment(commentId, userId) {
    const comment = await this.getCommentById(commentId)
    // @ts-ignore
    if (comment.creatorId.toString() !== userId) {
      throw new BadRequest("You can only delete your own comments")
    }
    await comment.remove()
    return comment
  }

  async getCommentsByEvent(eventId) {
    const comments = dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
    return comments
  }

  async isAttendingEvent(eventId, userId) {
    const userTickets = await ticketsService.getMyTickets(userId)
    const thisTicket = userTickets.find(t => t.eventId == eventId)
    if (thisTicket == undefined) {
      return false
    } else {
      return true
    }
  }
}

export const commentsService = new CommentsService()