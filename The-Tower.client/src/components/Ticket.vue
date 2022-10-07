<template>
  <div class="col-12 d-inline-flex justify-content-center m-2 ticket" v-if="!ticket?.towerEvent.isCanceled">
    <div class="row justify-content-around">
      <div class="col-4 img-fluid ">
        <img :src="ticket?.towerEvent.coverImg" :alt="ticket?.towerEvent.name">
      </div>
      <div class="col-6 ticket-bg ticket-body">
        <router-link :to="{name: 'Details', params: {id: ticket?.towerEvent.id}}">
          <h5 class="event-title mx-2 mt-2 selectable">{{ticket?.towerEvent.name}}</h5>
        </router-link>
        <p class="event-text mx-2">{{ticket?.towerEvent.location}}</p>
        <p class="event-text mx-2">{{new Date(ticket?.towerEvent.startDate).toLocaleDateString('en-us', {month: 'short',
        day:
        '2-digit',
        year: 'numeric'})}}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";

export default {
  props: {
    ticket: { type: Object, required: true }
  },
  setup() {
    return {
    }
  }
}
</script>


<style lang="scss" scoped>
.event-text {
  color: #CCF3FD;
  text-shadow: 0px 0px 4px rgba(44, 44, 44, 0.616);
  letter-spacing: 0.05em;
}

.event-title {
  color: #eaeaea;
  text-shadow: 1px 1px 5px rgba(49, 48, 48, 0.638);
  letter-spacing: 0.05em;
}

img {
  height: 25vh;
  width: 25vw;
}

.ticket {
  background-image: url("src\assets\img\ticket-bg-img.png");
}
</style>