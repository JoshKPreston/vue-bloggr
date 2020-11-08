
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
  <div class="CommentComponent bg-info text-light">
    {{ comments }}
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { commentService } from '../services/CommentService'
export default {
  name: 'CommentComponent',
  props: {
    commentProp: {
      type: Object,
      default: () => {
        alert('this comment does not exist')
      }
    }
  },
  setup(props) {
    onMounted(() => {
      commentService.getBlogComments()
    })
    return {
      comments: computed(() => props.commentProp)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
