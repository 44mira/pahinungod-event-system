<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

const route = useRoute().params.tab;
const eventKeys = ["id", "name", "desc", "status"];

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
            <div
              class="badge"
              :class="{
                'badge-success': event.status === 'active',
                'badge-warning': event.status === 'upcoming',
                'badge-error': event.status === 'past',
              }"
            >
              {{ event.status.toUpperCase() }}
            </div>
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

    <div class="overflow-x-auto bg-primary">
      <table class="table table-zebra">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th v-for="(key, index) in eventKeys" :key="index">
              {{ key.toUpperCase() }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(event, index) in displayedEvents">
            <th>{{ index + 1 }}</th>
            <th>{{ event.id }}</th>
            <td>{{ event.name }}</td>
            <td>{{ event.desc }}</td>
            <td>
              <div
                class="badge"
                :class="{
                  'badge-success': event.status === 'active',
                  'badge-warning': event.status === 'upcoming',
                  'badge-error': event.status === 'past',
                }"
              >
                {{ event.status.toUpperCase() }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
