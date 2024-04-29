<script setup>
const { eventStatus } = defineProps(["eventStatus"]);
</script>

<template>
  <div
    class="badge"
    :class="{
      'badge-success': eventStatus === 'active',
      'badge-warning': eventStatus === 'upcoming',
      'badge-error': eventStatus === 'past',
    }"
  >
    {{ eventStatus.toUpperCase() }}
  </div>
</template>
