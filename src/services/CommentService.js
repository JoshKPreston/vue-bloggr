
// Comments: "api/comments"
// Schema:
// body: { type: String, required: true }
// blog: { type: ObjectId, ref: "Blog", required: true }
// creatorEmail: { type: String, required: true }
// Endpoints:
// POST: '/'
// Create new Comment*

// PUT: '/:id'
// Edits Comment**

// DELETE: '/:id'
// Deletes Comment**

// * requires user login

// ** requires login and ownership of data

// *** accepts query parameter "creatorEmail" and filters for that creator

import { api } from './AxiosService'
import { AppState } from '../AppState'

class CommentService {
  async getBlogComments(blogId) {
    try {
      const res = await api.get('/blogs/' + blogId + '/comments')
      AppState.comments = res.data
      // eslint-disable-next-line no-console
      console.log(res.data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  async getCommentById(blogId, commentId) {
    try {
      const res = await api.get('/blogs/' + blogId + '/comments/' + commentId)
      // eslint-disable-next-line no-console
      console.log(res.data)
      AppState.commentPost = res.data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  // body: { type: String, required: true }
  // blog: { type: ObjectId, ref: "Blog", required: true }
  // creatorEmail: { type: String, required: true }
  async create(blogId, comment) {
    try {
      const res = await api.post('/blogs/' + blogId + '/comments', comment)
      // eslint-disable-next-line no-console
      console.log(res.data)
      this.getBlogComments(blogId)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  async edit(blogId, commentId, newCommentData) {
    try {
      const res = await api.put('/blogs/' + blogId + '/comments/' + commentId, newCommentData)
      // eslint-disable-next-line no-console
      console.log(res.data)
      this.getBlogComments(blogId)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  async delete(blogId, commentId) {
    try {
      const res = await api.delete('/blogs/' + blogId + '/comments/' + commentId)
      // eslint-disable-next-line no-console
      console.log(res.data)
      this.getBlogComments(blogId)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }
}

export const commentService = new CommentService()
