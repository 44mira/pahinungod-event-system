<script setup>
import { ref } from "vue";

const eventKeys = [
  "event id",
  "admin id",
  "name",
  "event time",
  "orientation time",
  "location",
  "description",
  "status",
];

const { route, displayedEvents } = defineProps(["route", "displayedEvents"]);

const modalList = ref(Array(displayedEvents.length).fill(false));

function displayModal(index) {
  modalList.value[index] = !modalList.value[index];
}
</script>

<template>
  <div class="bg-primary w-9/12 overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th v-for="(key, index) in eventKeys" :key="index">
            {{ key.toUpperCase() }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(event, index) in displayedEvents"
          class="hover:cursor-pointer"
          :class="{ 'bg-secondary': modalList[index] }"
          @click="displayModal(index)"
          :key="event.id"
        >
          <td>{{ event.event_id }}</td>
          <td>{{ event.admin_id }}</td>
          <td>{{ event.name }}</td>
          <td>{{ event.event_time }}</td>
          <td>{{ event.orientation_time }}</td>
          <td>{{ event.location }}</td>
          <td>{{ event.description }}</td>
          <td><StatusBadge :eventStatus="event.status" /></td>

          <dialog
            class="modal modal-bottom sm:modal-middle"
            :class="{ 'modal-open': modalList[index] }"
          >
            <div class="modal-box">
              <figure><img src="/event-placeholder.svg" /></figure>
              <div class="divider"></div>
              <h3 class="font-bold text-lg">
                {{ event.name }}
                <StatusBadge :eventStatus="event.status" />
              </h3>
              <p class="py-4">{{ event.description }}</p>
              <div class="divider"></div>
              <div class="text-sm grid grid-cols-2">
                <p>Orientation:</p>
                <pre>{{ event.orientation_time.split("T").join(" | ") }}</pre>
                <p>Event:</p>
                <pre>{{ event.event_time.split("T").join(" | ") }}</pre>
              </div>
            </div>
            <form method="dialog" class="modal-backdrop">Close</form>
          </dialog>
        </tr>
      </tbody>
    </table>
  </div>
</template>
