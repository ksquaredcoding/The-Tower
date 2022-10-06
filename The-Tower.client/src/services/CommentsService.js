import { AppState } from "../AppState.js"
import { TowerComment } from "../models/TowerComment.js"
import { api } from "./AxiosService.js"


class CommentsService {
  async addComment(commentData) {
    const res = await api.post('/api/comments', commentData)
    const comment = new TowerComment(res.data)
    AppState.comments = [comment, ...AppState.comments]
  }

  async deleteComment(id) {
    await api.delete(`/api/comments/${id}`)
    AppState.comments = AppState.comments.filter(c => c.id !== id)
  }
}
export const commentsService = new CommentsService()