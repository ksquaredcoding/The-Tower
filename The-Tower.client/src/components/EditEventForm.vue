<template>
  <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="eventEdit"
    aria-labelledby="editEventsCanvasLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="editEventsCanvasLabel">Edit Event</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" v-model="editable.name" placeholder="name" required class="form-control">
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea v-model="editable.description" placeholder="Tell us about your event..." class="form-control"
            rows="4" required></textarea>
        </div>
        <div class="form-group">
          <label for="coverImg">Cover Image Url:</label>
          <input type="url" v-model="editable.coverImg" class="form-control"
            placeholder="Give your event a cool cover image">
        </div>
        <div class="form-group">
          <label for="location">Location:</label>
          <input type="text" v-model="editable.location" placeholder="location" required class="form-control">
        </div>
        <div class="form-group">
          <label for="capacity">Capacity:</label>
          <input type="number" v-model="editable.capacity" placeholder="capacity" required class="form-control">
        </div>
        <div class="form-group">
          <label for="startDate">Start Date:</label>
          <input type="datetime-local" v-model="editable.startDate" placeholder="startDate" required
            class="form-control">
        </div>
        <div>
          <label for="type">Event Type:</label>
          <select name="type" v-model="editable.type">
            <option value="concert">Concert</option>
            <option value="convention">Convention</option>
            <option value="sport">Sport</option>
            <option value="digital">Digital</option>
          </select>
        </div>
        <div class="my-3">
          <button class="btn btn-primary" type="submit" data-bs-dismiss="offcanvas">Submit Edit</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { ref, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...AppState.activeEvent }
    })
    return {
      editable,
      async handleSubmit() {
        try {
          const eventData = editable.value
          await eventsService.editEvent(eventData)
        } catch (error) {
          console.error('[EDIT EVENT]', error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>