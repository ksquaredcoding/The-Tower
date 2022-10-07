<template>
  <h5 class="text-success m-2">My Upcoming Events</h5>
  <div class="row justify-content-center">
    <Ticket v-for="t in tickets" :ticket="t" />
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { AppState } from "../AppState.js";
import { accountService } from "../services/AccountService.js";
import Pop from "../utils/Pop.js";
import Ticket from "../components/Ticket.vue";

export default {
  setup() {
    async function getMyTickets() {
      try {
        await accountService.getMyTickets();
      }
      catch (error) {
        console.error("[GETTING ACCOUNT TICKETS]", error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getMyTickets();
    });
    return {
      tickets: computed(() => AppState.accountTickets)
    };
  },
  components: { Ticket }
}
</script>


<style lang="scss" scoped>

</style>
