<template>
  <div class="d-flex justify-content-around my-3">
    <button @click="getAllEvents()" class="btn btn-outline-warning" title="Get All Events">All</button>
    <button @click="getEventsByType('concert')" class="btn btn-outline-warning"
      title="Get Concert Events">Concert</button>
    <button @click="getEventsByType('convention')" class="btn btn-outline-warning"
      title="Get Convention Events">Convention</button>
    <button @click="getEventsByType('sport')" class="btn btn-outline-warning" title="Get Sport Events">Sport</button>
    <button @click="getEventsByType('digital')" class="btn btn-outline-warning"
      title="Get Digital Events">Digital</button>
    <button @click="getCanceledEvents()" class="btn btn-outline-danger text-light"
      title="Get Canceled Events">Canceled</button>
  </div>
  <div class="row justify-content-evenly">
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
      events: computed(() => AppState.events),

      async getEventsByType(type) {
        try {
          await eventsService.getEventsByType(type)
        } catch (error) {
          console.error("[GETTING EVENTS BY TYPE]", error);
          Pop.error(error.message);
        }
      },

      async getCanceledEvents() {
        try {
          await eventsService.getCanceledEvents()
        } catch (error) {
          console.error("[GETTING CANCELED EVENTS]", error);
          Pop.error(error.message);
        }
      },
      getAllEvents
    };
  },
  components: { EventCard }
}
</script>


<style lang="scss" scoped>

</style>