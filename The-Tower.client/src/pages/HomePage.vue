<template>
  <div class="row">
    <EventCard v-for="e in events" :event="e" :key="e.id" />
  </div>
</template>

<!-- TODO get events rendering to the page not empty objects -->
<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { eventsService } from '../services/EventsService.js';
import EventCard from "../components/EventCard.vue";

export default {
  setup() {
    async function getAllEvents() {
      try {
        await eventsService.getAllEvents();
      }
      catch (error) {
        console.error("[GETTING ALL EVENTS]", error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getAllEvents();
    });
    return {
      events: computed(() => AppState.events)
    };
  },
  components: { EventCard }
}
</script>


<style lang="scss" scoped>

</style>