<template>
  <header>
    <Navbar />
  </header>
  <main class="dark-main-bg">
    <router-view />
  </main>
  <EditEventForm />
  <CreateEventForm />
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import EditEventForm from "./components/EditEventForm.vue"
import CreateEventForm from "./components/CreateEventForm.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, EditEventForm, CreateEventForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.dark-main-bg {
  background-color: #25334a;
}
</style>
