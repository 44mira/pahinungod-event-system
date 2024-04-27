<script setup>
import { ref } from "vue";

const eventKeys = ["id", "name", "desc", "status"];

const { route, displayedEvents } = defineProps(["route", "displayedEvents"]);

const modalList = ref(Array(displayedEvents.length).fill(false));

function displayModal(index) {
  modalList.value[index] = !modalList.value[index];
}
</script>

<template>
  <div class="bg-primary w-screen">
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
          <th>{{ index + 1 }}</th>
          <td>{{ event.id }}</td>
          <td>{{ event.name }}</td>
          <td>{{ event.desc }}</td>
          <td>
            <StatusBadge :eventStatus="event.status" />
          </td>

          <dialog
            class="modal modal-bottom sm:modal-middle"
            :class="{ 'modal-open': modalList[index] }"
          >
            <div class="modal-box">
              <figure><img src="/event-placeholder.svg" /></figure>
              <h3 class="font-bold text-lg">
                {{ event.name }}
                <StatusBadge :eventStatus="event.status" />
              </h3>
              <p class="py-4">{{ event.desc }}</p>
            </div>
            <form method="dialog" class="modal-backdrop">Close</form>
          </dialog>
        </tr>
      </tbody>
    </table>
  </div>
</template>
