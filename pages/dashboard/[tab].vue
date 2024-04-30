<script setup>
import { defineAsyncComponent } from "vue";
import { createClient } from "@supabase/supabase-js";
const config = useRuntimeConfig().public;

definePageMeta({
  layout: "dashboard",
});

const supabase = createClient(config.supabaseUrl, config.supabaseKey);

const route = useRoute().params.tab;

const { data: events, pending } = await useAsyncData(async () => {
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("status", route);
  return data;
});
</script>

<template>
  <div class="w-full bg-base flex flex-col items-center">
    <div
      class="carousel carousel-center space-x-4 bg-base w-96 border rounded-lg"
    >
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
    <div class="flex flex-col gap-3 w-9/12">
      <CreateEvent />
      <div v-if="pending">
        <div class="skeleton w-full h-52" />
      </div>
      <div v-else>
        <EventTable :route="route" :displayedEvents="events" />
      </div>
    </div>
  </div>
</template>
