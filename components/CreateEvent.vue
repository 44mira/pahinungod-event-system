<script setup>
import { ref } from "vue";

const showModal = ref(false);
</script>

<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
  />
  <button
    class="btn btn-outline btn-accent w-fit self-center sm:self-start"
    @click="showModal = true"
  >
    <span class="material-symbols-outlined"> add </span>
    CREATE NEW EVENT
  </button>

  <dialog class="modal" :class="{ 'modal-open': showModal }">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Create new event</h3>
      <p class="py-4">Press ESC key or click the button below to close</p>
      <div class="modal-action">
        <button class="btn" @click="showModal = false">Close</button>
      </div>
    </div>
  </dialog>
</template>
