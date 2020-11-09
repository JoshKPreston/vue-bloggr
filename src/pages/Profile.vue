
// "subs": [
//     "github|8108935"
// ],
// "_id": "5fa5e81bca67480017a3902f",
// "name": "Josh K Preston",
// "picture": "https://avatars0.githubusercontent.com/u/8108935?v=4",
// "email": "joshkpreston@gmail.com",
// "createdAt": "2020-11-07T00:19:39.092Z",
// "updatedAt": "2020-11-07T00:19:39.092Z",
// "__v": 0,
// "id": "5fa5e81bca67480017a3902f"

<template>
  <!-- profile info -->
  <div class="row profile">
    <div class="col-3 profile-img">
      <img class="img-fluid rounded" :src="profile.picture" alt="picture" />
    </div>
    <div class="col-9 profile-info">
      <h6>{{ profile.name }}</h6>
      <h6>{{ profile.email }}</h6>
    </div>
  </div>
  <!-- form -->
  <form class="row new-post-form">
    <div class="col-12 col-md-9 form-group">
      <label for="newPostTitle">Title</label>
      <input id="newPostTitle" class="form-control" type="text" v-model="newPostTitle">
    </div>
    <div class="col-12 col-md-9 form-group">
      <label for="newPostBody">Body</label>
      <textarea id="newPostBody" class="form-control" type="text" v-model="newPostBody"></textarea>
    </div>
  </form>
  <button id="newPostBtn" @click="openBlogPostForm()">
    New
  </button>
  <button id="editPostBtn">
    Edit
  </button>
  <button id="deletePostBtn">
    Delete
  </button>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
export default {
  name: 'Profile',
  setup() {
    onMounted(() => {
      blogService.getBlogs()
    })
    return {
      profile: computed(() => AppState.profile),
      blogs: computed(() => AppState.blogs.filter(b => b.creator.id === AppState.profile.id))
    }
  }
}
</script>

<style scoped>
  .profile {
    padding: 2vh;
  }
  .profile-info {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: start;
  }
  form {
    padding: 2vh;
  }
  @media (min-width: 576px) {
    .profile-info h6 {
      font-size: 2em;
    }
  }
  @media (min-width: 768px) {
    .profile-info h6 {
      font-size: 3em;
    }
  }
</style>
