
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
  <div class="BlogPost">
    <div class="row">
      <div class="col-12 col-lg-10">
        <div class="row text-center">
          <div class="col-12">
            <h1>{{ post.title }}</h1>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-12">
            <h6>{{ post.body }}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { useRoute } from 'vue-router'
export default {
  name: 'BlogPost',
  setup() {
    const route = useRoute()
    onMounted(() => {
      blogService.getBlogById(route.params.id)
    })
    return {
      post: computed(() => AppState.blogPost)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
