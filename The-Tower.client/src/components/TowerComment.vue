<template>
  <div class="row">
    <div class="col-2 my-2">
      <img :src="towerComment?.creator.picture" :alt="towerComment?.creator.name" :title="towerComment?.creator.name"
        class="rounded-circle img-fluid">
    </div>
    <div class="col-9 comment-bg rounded text-dark my-2">
      <div class="d-flex justify-content-between">
        <h5>{{towerComment?.creator.name}} <span></span></h5>
        <i class="mdi mdi-delete-forever fs-4 selectable rounded text-danger" title="Delete Comment"
          @click="deleteComment(towerComment.id)" v-if="account.id == towerComment?.creator.id"></i>
      </div>
      <p>{{towerComment?.body}}</p>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { commentsService } from '../services/CommentsService.js';
import Pop from "../utils/Pop.js";

export default {
  props: {
    towerComment: { type: Object, required: true }
  },
  setup() {
    return {
      isAttending: computed(() => AppState.comments.find(c => c.accountId == AppState.account.id && c.eventId == AppState.activeEvent.id)),
      account: computed(() => AppState.account),
      async deleteComment(id) {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete this comment?')
          if (!yes) { return }
          await commentsService.deleteComment(id)
        } catch (error) {
          console.error('[DELETE COMMENT]', error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.comment-bg {
  background-color: #E2F9FF;
}
</style>