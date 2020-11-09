
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
  <div class="container-fluid">
    <!-- profile info -->
    <div class="row profile pt-5">
      <div class="col-3 profile-img">
        <img class="img-fluid rounded" :src="profile.picture" alt="picture" />
      </div>
      <div class="col-9 profile-info">
        <h6>{{ profile.name }}</h6>
        <h6>{{ profile.email }}</h6>
      </div>
    </div>
    <!-- form -->
    <div class="row bg-dark text-light">
      <div class="col-12 text-left pt-5 border-bottom">
        <h3>New Post</h3>
      </div>
    </div>
    <form class="row new-post-form" @submit.prevent="createPost(event)">
      <div class="col-12 col-md-9 form-group">
        <label for="newPostTitle">Title</label>
        <input id="newPostTitle" class="form-control" type="text" v-model="state.newPost.title">
      </div>
      <div class="col-12 col-md-9 form-group">
        <label for="newPostBody">Body</label>
        <textarea id="newPostBody" class="form-control" rows="10" type="textarea" v-model="state.newPost.body"></textarea>
      </div>
      <div class="col-12 col-md-9 form-group">
        <button class="btn btn-primary btn-block p-3" id="newPostBtn" type="submit">
          Post!
        </button>
      </div>
    </form>
    <!-- existing posts -->
    <div class="row" v-if="blogs">
      <div class="col-12 text-left pt-5 pb-3 border-bottom">
        <h3>Your Posts</h3>
      </div>
      <BlogComponent v-for="b in blogs" :key="b._id" :blog-prop="b" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import BlogComponent from '../components/BlogComponent'
export default {
  name: 'Profile',
  setup() {
    const state = reactive({
      newPost: {}
    })
    onMounted(() => {
      blogService.getBlogs()
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      blogs: computed(() => AppState.blogs.filter(b => b.creator !== null && b.creatorEmail === AppState.profile.email)),
      createPost(event) {
        blogService.create(state.newPost)
        event.target.reset()
        blogService.getBlogs()
      }
    }
  },
  components: { BlogComponent }
}
</script>

<style scoped>
  .profile {
    padding: 2vh;
  }
  .profile-img {
    max-width: 15vw;
  }
  .profile-img img {
    min-height: 50px;
    max-height: 15vh;
    min-width: 50px;
  }
  .profile-info {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: start;
    padding-left: 10vw;
  }
  .new-post-form {
    padding: 2vh;
  }
  @media (min-width: 576px) {
    .profile-info {
      padding-left: 5vw;
    }
    .profile-info h6 {
      font-size: 2em;
    }
  }
  @media (min-width: 992px) {
    .profile-info {
      padding-left: 1vw;
    }
    .profile-info h6 {
      font-size: 3em;
    }
  }
</style>
