<template>
  <div class="col-md-3 event-cover m-2">
    <router-link :to="{name: 'Details', params: {id: event?.id}}">
      <div class="event-details event-text selectable" :title="event?.name">
        <h4 class="event-title">{{event?.name}}</h4>
        <p>{{event?.location}}</p>
        <div class="d-flex event-text">
          <p class="me-2 pe-2">{{new Date(event?.startDate).toLocaleDateString('en-us', {month: 'short', day: '2-digit',
          year: 'numeric'})}}
          </p>
          <p class="ms-5 ps-1"><b>{{event?.capacity}}</b> spots left</p>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";

export default {
  props: {
    event: { type: Object, required: true }
  },
  setup(props) {
    return {
      coverImg: computed(() => `url(${props.event.coverImg})`)
    }
  }
}
</script>


<style lang="scss" scoped>
.event-cover {
  height: 25vh;
  background-image: v-bind(coverImg);
  background-size: cover;
  background-position: center;
  overflow: hidden;
  position: relative;
  border-radius: 3%;
}

.event-details {
  position: absolute;
  top: 8rem;
  background: rgba(78, 81, 82, 0.2);
  border: 1px solid rgba(86, 199, 251, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 3%;
  width: 100vw;
  box-sizing: border-box;
  margin-left: -1rem;
  padding: 0.2rem 0 0 1rem;
}

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
</style>