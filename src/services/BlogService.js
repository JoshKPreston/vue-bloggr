
// Blogs: "api/blogs"
// Schema:
// title: { type: String, required: true }
// body: { type: String, required: true }
// imgUrl: {type: String}
// tags: [{ type: String }]
// published: { type: Boolean, default: true }
// creatorEmail: { type: String, required: true }
// Endpoints:
// GET: '/'
// Returns all pubished Blogs***

// GET: '/:id'
// Returns blog by Id***

// POST: '/'
// Create new Blog*

// PUT: '/:id'
// Edits Blog**

// DELETE: '/:id'
// Deletes Blog**

// * requires user login

// ** requires login and ownership of data

// *** accepts query parameter "creatorEmail" and filters for that creator

import { api } from './AxiosService'
import { AppState } from '../AppState'

class BlogService {
  async getBlogs() {
    try {
      const res = await api.get('/blogs')
      // eslint-disable-next-line no-console
      console.log(res.data)
      AppState.blogs = res.data
      // eslint-disable-next-line no-console
      console.log(AppState.blogs)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('failed to get blogs')
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  async getBlogById(id) {
    try {
      const res = await api.get('/blogs/' + id)
      // eslint-disable-next-line no-console
      console.log(res.data)
      AppState.blogPost = res.data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('failed to get blog by id')
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  async create(newBlog) {
    try {
      const res = await api.post('/blogs', newBlog)
      // eslint-disable-next-line no-console
      console.log(res.data)
      AppState.blogs = [...AppState.blogs, res.data]
      this.getBlogs()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('failed to create blog')
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  async edit(id, newBlogPostData) {
    try {
      const res = await api.put('/blogs/' + id, newBlogPostData)
      // eslint-disable-next-line no-console
      console.log(res.data)
      const index = AppState.blogs.indexOf(b => b._id === id)
      AppState.blogs.splice(index, 1, newBlogPostData)
      this.getBlogs()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('failed to edit blog')
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  async delete(id, creatorEmail, profileEmail) {
    if (creatorEmail === profileEmail) {
      try {
        const blog = AppState.blogs.filter(blog => blog.id === id)
        if (blog) {
          const res = await api.delete('/blogs/' + id)
          AppState.blogs = AppState.blogs.filter(blog => blog.id !== id)
          // eslint-disable-next-line no-console
          console.log(res.data)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('failed to delete blog')
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }
}

export const blogService = new BlogService()
