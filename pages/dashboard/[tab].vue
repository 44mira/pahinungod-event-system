<script setup lang="ts">
import { createClient } from "@supabase/supabase-js";
const config = useRuntimeConfig().public;

definePageMeta({
  layout: "dashboard",
});

const supabase = createClient(config.supabaseUrl, config.supabaseKey);

const route = useRoute().params.tab;
const events = ref([]);

async function getEvents() {
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("status", route);
  events.value = data;
}

onMounted(() => {
  getEvents();
});
</script>

<template>
  <div class="w-full bg-base flex flex-col items-center">
    <div class="carousel carousel-center space-x-4 bg-base w-96">
      <div
        v-for="(event, index) in events"
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
          <p>{{ event.description }}</p>
          <div class="divider"></div>
          <div class="text-sm grid grid-cols-2">
            <p>Orientation:</p>
            <pre>{{ event.orientation_time.split("T").join(" | ") }}</pre>
            <p>Event:</p>
            <pre>{{ event.event_time.split("T").join(" | ") }}</pre>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center w-full py-2 gap-2">
      <a
        v-for="index in events.length"
        class="btn btn-xs bg-secondary text-white"
        :href="`#item-${index - 1}`"
      >
        {{ index }}
      </a>
    </div>
    <EventTable :route="route" :displayedEvents="events" />
  </div>
</template>
