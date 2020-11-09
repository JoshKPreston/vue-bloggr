
// "_id": "5fa584b3a546390017c0d702",
// "body": "really you can do it",
// "blog": "5fa5846ea546390017c0d701",
// "creatorEmail": "beasticorn@gmail.com",
// "createdAt": "2020-11-06T17:15:31.719Z",
// "updatedAt": "2020-11-06T17:15:31.719Z",
// "__v": 0,
// "creator": {
//     "_id": "5f8201b3565abd0017da4430",
//     "name": "beasticorn@gmail.com",
//     "picture": "https://avatars0.githubusercontent.com/u/63372695?v=4",
//     "email": "beasticorn@gmail.com",
//     "id": "5f8201b3565abd0017da4430"
// },
// "id": "5fa584b3a546390017c0d702"

<template>
  <div class="CommentComponent col-12 col-lg-9 w-75 bg-dark text-light border">
    <div class="row p-2 justify-content-around">
      <div class="col-2 align-self-center">
        <img
          v-if="comment.creator.picture"
          class="img-fluid rounded-circle"
          :src="comment.creator.picture"
          alt="picture"
        />
      </div>
      <div class="col-6 d-flex flex-column justify-content-center align-items-left">
        <p v-if="comment.body">
          {{ comment.body }}
        </p>
        <small v-if="comment.creator.name">{{ comment.creator.name }}</small>
      </div>
      <div class="col-2 d-flex align-items-center function-btns">
        <button v-if="comment.creatorEmail === profile.email" class="btn btn-info btn-edit" data-toggle="modal" data-target="#editCommentForm" @click="getComment(comment._id)">
          <i class="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <!-- Modal -->
        <div class="modal fade"
             id="editCommentForm"
             tabindex="-1"
             role="dialog"
             aria-labelledby="Edit comment"
             aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-dark" id="">
                  Edit comment
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form class="new-comment-form" @submit.prevent="editComment(event, comment._id, comment.creatorEmail, profile.email)">
                  <div class="form-group">
                    <label class=" text-dark" for="editCommentBody">Body</label>
                    <textarea id="editCommentBody"
                              class="form-control"
                              rows="10"
                              type="textarea"
                              v-model="state.editComment.body"
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
        <button v-if="comment.creatorEmail === profile.email" class="btn btn-danger btn-delete" @click="deleteComment(comment._id, comment.creatorEmail, profile.email)">
          <i class="fa fa-eraser" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
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
    const state = reactive({
      editComment: {}
    })
    return {
      state,
      comment: computed(() => props.commentProp),
      profile: computed(() => AppState.profile)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
