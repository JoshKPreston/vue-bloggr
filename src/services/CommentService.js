
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
  async getBlogComments(id) {
    try {
      const res = await api.get('/blogs/:id/comments')
      // eslint-disable-next-line no-console
      console.log(res.data.data)
      AppState.blogs = res.data.data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  async getCommentById() {
    try {
      const res = await api.get('/blogs/:id/comments/:id')
      // eslint-disable-next-line no-console
      console.log(res.data.data)
      AppState.blogs = res.data.data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  async create(blog) {
    try {
      const res = await api.post('/blogs/:id/comments', blog)
      // eslint-disable-next-line no-console
      console.log(res.data)
      AppState.blogs = [...AppState.blogs, res.data.data]
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  async edit(id, change) {
    try {
      const res = await api.put('/blogs/:id/comments/:id', change)
      // eslint-disable-next-line no-console
      console.log(res.data)
      AppState.blogs = [...AppState.blogs, res.data.data]
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  async delete(id) {
    try {
      const res = await api.delete('/blogs/:id/comments/:id')
      const blog = AppState.blogs.filter(blog => blog.id === id)
      // eslint-disable-next-line no-console
      console.log(blog)
      // eslint-disable-next-line no-console
      console.log(res.data.data)
      AppState.blogs = AppState.blogs.filter(blog => blog.id !== id)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }
}

export const commentService = new CommentService()
