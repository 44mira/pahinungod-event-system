<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

const route = useRoute().params.tab;

// dummy
const events: EventData[] = [
  { id: 1, name: "Hugyaw", desc: "lorem ipsum dolor sit", status: "active" },
  { id: 2, name: "Dula", desc: "lorem ipsum", status: "active" },
  { id: 3, name: "Web3 comes to UP", desc: "tester tester", status: "active" },
  { id: 4, name: "Hampang", status: "upcoming" },
  { id: 5, name: "Dula-dula", desc: "testiingg", status: "upcoming" },
  { id: 6, name: "Mugna Workshop", status: "past" },
];

const displayedEvents = computed(() => {
  return events.filter((event) => route === event.status);
});
</script>

<template>
  <div class="w-full bg-base flex flex-col items-center">
    <div
      class="carousel carousel-center p-4 space-x-4 bg-base w-96 rounded-box"
    >
      <div
        v-for="(event, index) in displayedEvents"
        class="carousel-item card w-96 rounded-xl"
        :key="event.id"
        :id="`item-${index}`"
      >
        <figure><img src="/event-placeholder.svg" /></figure>
        <div class="card-body bg-primary">
          <h2 class="card-title">
            {{ event.name }}
            <StatusBadge :eventStatus="event.status" />
          </h2>
          <p>{{ event.desc }}</p>
        </div>
      </div>
    </div>

    <div class="flex justify-center w-full py-2 gap-2">
      <a
        v-for="index in displayedEvents.length"
        class="btn btn-xs bg-secondary text-white"
        :href="`#item-${index - 1}`"
      >
        {{ index }}
      </a>
    </div>
    <EventTable :route="route" :displayedEvents="displayedEvents" />
  </div>
</template>
