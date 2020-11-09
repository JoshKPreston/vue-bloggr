<template>
  <div class="home container-fluid">
    <div class="row" v-if="blogs">
      <BlogComponent v-for="b in blogs" :key="b._id" :blog-prop="b" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import BlogComponent from '../components/BlogComponent'
import { blogService } from '../services/BlogService'
export default {
  name: 'Home',
  setup() {
    onMounted(() => {
      blogService.getBlogs()
    })
    return {
      blogs: computed(() => AppState.blogs.filter(b => b.creator != null))
    }
  },
  components: { BlogComponent }
}
</script>
