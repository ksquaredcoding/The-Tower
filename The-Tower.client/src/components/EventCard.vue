<template>
  <div class="col-md-3 event-cover">
    <div>
      <h3>{{event?.name}}</h3>
      <p>{{event?.location}}</p>
      <p>{{event?.startDate}}</p>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    event: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.event-cover {
  height: 110vh;
  background-image: v-bind(coverImg);
  background-size: cover;
  background-position: center;
  overflow: hidden;
  position: relative;
}
</style>