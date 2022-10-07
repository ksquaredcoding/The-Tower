<template>
  <div class="col-10 d-inline-flex justify-content-center m-2" v-if="!ticket?.towerEvent.isCanceled"></div>
  <div class="row justify-content-around ticket" style="width: 80vw">
    <div class="col-4 img-fluid ">
      <img :src="ticket?.towerEvent.coverImg" :alt="ticket?.towerEvent.name">
    </div>
    <div class="col-4 ticket-bg ticket-body">
      <router-link :to="{name: 'Details', params: {id: ticket?.towerEvent.id}}">
        <h5 class="event-title mx-2 mt-2 selectable" :title="ticket?.towerEvent.name">{{ticket?.towerEvent.name}}</h5>
      </router-link>
      <p class="event-text mx-2">{{ticket?.towerEvent.location}}</p>
      <p class="event-text mx-2">{{new Date(ticket?.towerEvent.startDate).toLocaleDateString('en-us', {month: 'short',
      day:
      '2-digit',
      year: 'numeric'})}}</p>
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
      coverImg: 'src\assets\img\ticket-bg-img.png'
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

// .ticket {
//   background-image: url("https://i.imgur.com/lh9FK0i.png");
//   background-position: center;
//   background-size: cover;
// }

.ticket {
  background-color: #364a6a;
  border: 0.35rem solid rgb(238, 236, 236);
  border-radius: 3%;
}
</style>