<template>
  <header>
    <Navbar />
  </header>
  <main class="dark-main-bg">
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.dark-main-bg {
  background-color: #25334a;
}
</style>
