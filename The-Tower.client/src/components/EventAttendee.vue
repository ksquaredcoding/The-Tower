<template>
  <img :src="attendee?.account.picture" :alt="attendee?.account.name" :title="attendee?.account.name"
    class="rounded-circle img-fluid">
</template>


<script>
export default {
  props: {
    attendee: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
img {
  height: 3rem;
  width: 4rem;
}
</style>