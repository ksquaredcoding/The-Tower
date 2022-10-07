<template>
  <form @submit.prevent="handleSubmit" v-if="account.id">
    <div class="form-group">
      <div class="d-flex justify-content-end">
        <label for="body" class="text-success mb-1" title="Add Comment" aria-label="Add Comment">Join The
          Conversation</label>
      </div>
      <textarea v-model="editable.body" placeholder="Tell the people..." class="form-control" rows="4" name="body"
        title="Add Comment" aria-label="Add Comment"></textarea>
    </div>
    <div class="my-3 d-flex justify-content-end">
      <button class="btn btn-success" type="submit" title="Submit Comment" aria-label="Submit Comment">Post
        Comment</button>
    </div>
  </form>
</template>


<script>
import { ref } from "vue";
import { computed } from "@vue/reactivity";
import Pop from "../utils/Pop.js";
import { commentsService } from '../services/CommentsService.js';
import { AppState } from "../AppState.js";

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      account: computed(() => AppState.account),
      async handleSubmit() {
        try {
          const commentData = editable.value
          commentData.eventId = AppState.activeEvent.id
          await commentsService.addComment(commentData)
          editable.value = ''
        } catch (error) {
          console.error("[ADDING COMMENT]", error);
          Pop.error(error.message);
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>