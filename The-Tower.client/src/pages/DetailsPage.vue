<template>
  <div class="container-fluid text-light">
    <div class="row mx-1 my-2 rounded" :style="{backgroundImage: `url(${activeEvent?.coverImg})`}"
      style="background-repeat:no-repeat; background-size:cover; background-position: center; ">
      <div class="col-md-4 event-bgrd py-2 left-round" :class="{cancelBg: isCanceled}">
        <img :src="activeEvent?.coverImg" :alt="activeEvent?.name" class="img-fluid ms-1 rounded">
      </div>
      <div class="col-md-8 px-4 py-2 event-bgrd right-round" :class="{cancelBg: isCanceled}">
        <div class="d-flex justify-content-between">
          <h2 class="event-title">{{activeEvent?.name}}</h2>
          <h4 class="event-text">{{new Date(activeEvent?.startDate).toLocaleDateString('en-us', {month: 'short', day:
          '2-digit',
          year: 'numeric'})}}</h4>
        </div>
        <div class="d-flex justify-content-between">
          <p class="event-text"><b>{{activeEvent?.location}}</b></p>
          <p class="event-text">{{new Date(activeEvent?.startDate).toLocaleTimeString('en-us', {hour: 'numeric', minute:
          '2-digit'})}}</p>
        </div>
        <div>
          <p class="event-details">{{activeEvent?.description}}</p>
        </div>
        <div class="d-flex justify-content-between">
          <p class="event-text"><b class="event-cap fs-4">{{activeEvent?.capacity}}</b> <b>spots left</b></p>
          <button class="btn btn-danger" type="button" aria-label="Cancel Ticket" title="Cancel Ticket"
            @click="cancelTicket()" v-if="isAttending">Cancel Ticket <i class="bi bi-person-dash-fill"></i></button>

          <button class="btn btn-danger disabled" type="button" aria-label="No Spots Left" title="No Spots Left"
            v-else-if="!isAttending && activeEvent?.capacity <= 0">
            No Spots Left <i class="bi bi-person-x-fill"></i></button>

          <button class="btn btn-danger disabled" type="button" aria-label="Cancel Ticket" title="Cancel Ticket"
            v-else-if="activeEvent?.isCanceled">
            Event Canceled <i class="bi bi-x-octagon-fill"></i></button>

          <button class="btn btn-warning" type="button" aria-label="Attend Event" title="Attend" @click="attendEvent()"
            v-else>Attend <i class="bi bi-person-check-fill"></i></button>
        </div>
        <div class="d-flex justify-content-end mt-5">
          <button class="btn btn-danger" type="button" aria-label="Cancel Event" title="Cancel Event"
            @click="cancelEvent()" v-if="activeEvent?.creatorId == account.id">Cancel Event <i
              class="bi bi-x-square-fill"></i></button>
        </div>
      </div>
    </div>
    <h5>See who is attending</h5>
    <div class="row elevation-1 att-bgrd p-1 mx-1 rounded">
      <EventAttendee v-for="a in attendees" :attendee="a" class="m-1" />
    </div>
    <h5 class="mt-3 mx-2 my-2">What people are saying</h5>
    <div class="row justify-content-center">
      <div class="col-md-10 att-bgrd elevation-1 rounded">
        <div class="row">
          <CommentForm />
        </div>
        <TowerComment v-for="c in comments" :towerComment="c" />
      </div>
    </div>
  </div>
</template>
<!-- TODO let people attend events -->
<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { AuthService } from "../services/AuthService.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import CommentForm from "../components/CommentForm.vue";
import TowerComment from "../components/TowerComment.vue";

export default {
  setup() {
    const route = useRoute();
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.id);
      }
      catch (error) {
        console.error("[GETTING EVENT BY ID]", error);
        Pop.error(error.message);
      }
    }
    async function getEventAttendees() {
      try {
        await getEventById()
        if (!AppState.activeEvent?.isCanceled) {
          await eventsService.getEventAttendees(route.params.id);
        }
      }
      catch (error) {
        console.error("[GETTING EVENT ATTENDEES]", error);
        Pop.error(error.message);
      }
    }
    async function getEventComments() {
      try {
        await eventsService.getEventComments(route.params.id);
      }
      catch (error) {
        console.error("[GETTING EVENT COMMENTS]", error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getEventById();
      getEventAttendees();
      getEventComments();
    });
    return {
      activeEvent: computed(() => AppState.activeEvent),
      attendees: computed(() => AppState.attendees),
      isAttending: computed(() => AppState.attendees.find(a => a.accountId == AppState.account.id && a.eventId == AppState.activeEvent.id)),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      isCanceled: computed(() => AppState.activeEvent?.isCanceled),
      async attendEvent() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithRedirect();
          }
          await eventsService.attendEvent({
            eventId: AppState.activeEvent.id || route.params.id
          });
          Pop.success("Thanks for attending this event!");
        }
        catch (error) {
          console.error("[ATTEND EVENT]", error);
          Pop.error(error.message);
        }
      },
      async cancelTicket() {
        try {
          const yes = await Pop.confirm("Are you sure you want to cancel your ticket for this event?");
          if (!yes) {
            return;
          }
          const attendee = AppState.attendees.find(a => a.accountId == AppState.account.id && a.eventId == AppState.activeEvent.id);
          await eventsService.cancelTicket(attendee.id);
          Pop.success("Sorry to hear that you are unable to attend this event.");
        }
        catch (error) {
          console.error("[CANCEL TICKET]", error);
          Pop.error(error.message);
        }
      },
      async cancelEvent() {
        try {
          const yes = await Pop.confirm("Are you sure you want to cancel this event?");
          if (!yes) {
            return;
          }
          await eventsService.cancelEvent(AppState.activeEvent.id)
        } catch (error) {
          console.error("[CANCEL EVENT]", error);
          Pop.error(error.message);
        }
      }
    };
  },
  components: { CommentForm, Comment, TowerComment }
}
</script>

<style lang="scss" scoped>
.event-bgrd {
  background-color: rgba(47, 107, 107, 0.428);
  backdrop-filter: blur(10px);
}

.right-round {
  border-radius: 0 1% 1% 0;
}

.left-round {
  border-radius: 1% 0 0 1%;
}

.event-title {
  color: #eaeaea;
  text-shadow: 1px 1px 5px rgba(49, 48, 48, 0.638);
  letter-spacing: 0.05em;
}

.event-text {
  color: #CCF3FD;
  text-shadow: 0px 0px 4px rgba(44, 44, 44, 0.616);
  letter-spacing: 0.05em;
}

.event-details {
  color: #eaeaea;
  text-shadow: 0px 0px 4px rgba(44, 44, 44, 0.616);
  letter-spacing: 0.05em;
}

.event-cap {
  color: #12f9fc;
  text-shadow: 1px 1px 4px rgba(44, 44, 44, 0.77);
  letter-spacing: 0.05em;
}

.att-bgrd {
  background-color: #364a6a;
}

.cancelBg {
  background-color: rgba(210, 42, 27, 0.428);
  backdrop-filter: blur(10px);
}
</style>
