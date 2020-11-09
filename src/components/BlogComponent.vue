
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
  <div class="BlogComponent col-12 col-lg-9 bg-dark text-light border">
    <div class="row p-2 justify-content-around">
      <div class="col-2 align-self-center">
        <img
          v-if="blog.creator.picture"
          class="img-fluid rounded-circle"
          :src="blog.creator.picture"
          alt="picture"
        />
      </div>
      <div class="col-6 d-flex flex-column justify-content-center align-items-left">
        <router-link :to="{ name: 'BlogPost', params: {id: blog._id} }">
          <h6 v-if="blog.title">
            {{ blog.title }}
          </h6>
        </router-link>
        <small v-if="blog.creator.name">{{ blog.creator.name }}</small>
      </div>
      <div class="col-2 d-flex align-items-center function-btns">
        <button v-if="blog.creatorEmail === profile.email" class="btn btn-info btn-edit" data-toggle="modal" :data-target="'#modal_' + blog._id" @click="getPost(blog._id)">
          <i class="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <!-- Modal -->
        <div class="modal fade"
             :id="'modal_' + blog._id"
             tabindex="-1"
             role="dialog"
             aria-labelledby="Edit post"
             aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-dark" id="">
                  Edit post
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form class="new-post-form" @submit.prevent="editPost(blog._id, blog.creatorEmail, profile.email)">
                  <div class="form-group">
                    <label class=" text-dark" :for="'modal_' + blog._id + '_title'">Title</label>
                    <input :id="'modal_' + blog._id + '_title'" class="form-control" type="text" v-model="state.editPost.title">
                  </div>
                  <div class="form-group">
                    <label class=" text-dark" :for="'modal_' + blog._id + '_body'">Body</label>
                    <textarea :id="'modal_' + blog._id + '_body'"
                              class="form-control"
                              rows="10"
                              type="textarea"
                              v-model="state.editPost.body"
                    >
                    </textarea>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-block p-3" data-dismiss="modal">
                      Close
                    </button>
                    <button type="submit" class="btn btn-primary btn-block p-3">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <button v-if="blog.creatorEmail === profile.email" class="btn btn-danger btn-delete" @click="deletePost(blog._id, blog.creatorEmail, profile.email)">
          <i class="fa fa-eraser" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
export default {
  name: 'BlogComponent',
  props: {
    blogProp: {
      type: [Object, null],
      default: () => { alert('blog not found') }
    }
  },
  setup(props) {
    const state = reactive({
      editPost: {}
    })
    return {
      state,
      blog: computed(() => props.blogProp),
      // comments: computed(() => AppState.comments)
      profile: computed(() => AppState.profile),
      getPost(blogId) {
        const blog = blogService.getBlogById(blogId)
        state.editPost.title = blog.title
        state.editPost.body = blog.body
      },
      editPost(blogId, creatorEmail, profileEmail) {
        blogService.edit(blogId, state.editPost, creatorEmail, profileEmail)
      },
      deletePost(blogId, creatorEmail, profileEmail) {
        blogService.delete(blogId, creatorEmail, profileEmail)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
  .BlogComponent {
    border-radius: 50% 0% 0% 50%;
  }
  .function-btns {
    flex-flow: column;
  }
  @media (min-width: 576px){
    .function-btns {
      flex-flow: row;
    }
  }
</style>
