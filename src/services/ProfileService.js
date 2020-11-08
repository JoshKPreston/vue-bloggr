
// Profile: "api/profile"
// Schema:
// subs: [{ type: String, unique: true }],
// email: { type: String, lowercase: true, unique: true },
// name: { type: String, required: true },
// picture: { type: String }
// Endpoints:
// GET: '/'
// Returns users profile, creates one if it does not exist*

// GET: '/blogs'
// Returns logged in users Blogs**

// GET: '/comments'
// Returns logged in users Comments**

// PUT: '/'
// Allows user to edit their own profile**

// * requires user login

// ** requires login and ownership of data

// *** accepts query parameter "creatorEmail" and filters for that creator

import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProfileService {
  async getProfile() {
    try {
      const res = await api.get('/profile')
      AppState.profile = res.data
      // eslint-disable-next-line no-console
      console.log(res.data)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }
}

export const profileService = new ProfileService()
