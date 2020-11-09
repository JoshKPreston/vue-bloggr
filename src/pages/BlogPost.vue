
// "tags": [],
// "published": true,
// "_id": "5f8e224b7fcfd30017ae8e1a",
// "title": "I am sad",
// "body": "Very sad",
// "creatorEmail": "schoeneckerj@gmail.com",
// "createdAt": "2020-10-19T23:33:31.277Z",
// "updatedAt": "2020-10-19T23:33:31.277Z",
// "__v": 0,
// "creator": {
//     "_id": "5f8e223d7fcfd30017ae8e19",
//     "name": "Josh Schoenecker",
//     "picture": "https://avatars3.githubusercontent.com/u/60305520?v=4",
//     "email": "schoeneckerj@gmail.com",
//     "id": "5f8e223d7fcfd30017ae8e19"
// },
// "id": "5f8e224b7fcfd30017ae8e1a"

<template>
  <div class="BlogPost container-fluid">
    <div class="row">
      <div class="col-12 col-lg-10">
        <div class="row text-center">
          <div class="col-12 col-lg-8 pt-5">
            <h1>{{ post.title }}</h1>
          </div>
        </div>
        <hr>
        <div class="row text-center pt-5">
          <div class="col-12">
            <h6>{{ post.body }}</h6>
          </div>
        </div>
        <form class="row align-items-center pt-5">
          <div class="col-8">
            <input class="form-control" type="text" v-model="state.newComment.body" placeholder="Leave a comment...">
          </div>
          <div class="col-4">
            <small class="btn btn-primary btn-block" @click="postComment(post._id)">Post!</small>
          </div>
        </form>
        <div class="row text-center">
          <CommentComponent v-for="c in comments" :key="c._id" :comment-prop="c" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { blogService } from '../services/BlogService'
import { commentService } from '../services/CommentService'
import CommentComponent from '../components/CommentComponent'
export default {
  name: 'BlogPost',
  setup() {
    const route = useRoute()
    onMounted(() => {
      blogService.getBlogById(route.params.id)
      commentService.getBlogComments(route.params.id)
    })
    const state = reactive({
      newComment: {}
    })
    return {
      state,
      post: computed(() => AppState.blogPost),
      comments: computed(() => AppState.comments),
      postComment(blogId) {
        state.newComment.blog = blogId
        state.newComment.creatorEmail = AppState.profile.email
        commentService.create(blogId, state.newComment)
        state.newComment = {}
      }
    }
  },
  components: { CommentComponent }
}
</script>

<style lang="scss" scoped>

</style>
