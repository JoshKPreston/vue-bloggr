save
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
  <div class="BlogComponent col-12 col-lg-9 card bg-dark text-light">
    <div class="row">
      <div class="col-2">
        <img
          v-if="blog.creator.picture"
          class="img-fluid w-100"
          :src="blog.creator.picture"
          alt="picture"
        />
      </div>
      <div class="col-6">
        <router-link :to="{ name: 'BlogPost', params: {id: blog._id} }">
          <h6 v-if="blog.title">
            {{ blog.title }}
          </h6>
        </router-link>
        <p v-if="blog.body">
          {{ blog.body }}
        </p>
        <small v-if="blog.creator.name">{{ blog.creator.name }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
// import { AppState } from '../AppState'
export default {
  name: 'BlogComponent',
  props: {
    blogProp: {
      type: [Object, null],
      default: () => { alert('blog not found') }
    }
  },
  setup(props) {
    return {
      blog: computed(() => props.blogProp)
      // comments: computed(() => AppState.comments)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
