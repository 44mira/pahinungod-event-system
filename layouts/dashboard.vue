<script setup>
import { computed } from "vue";

const currentTab = computed(() => useRoute().params.tab);
</script>

<template>
  <main class="flex flex-col">
    <div
      tag="div"
      role="tablist"
      class="tabs tabs-lg tabs-boxed border-4 border-b-primary"
    >
      <NuxtLink
        to="/dashboard/upcoming"
        role="tab"
        class="tab"
        :class="{ 'tab-active': currentTab === 'upcoming' }"
      >
        Upcoming
      </NuxtLink>
      <NuxtLink
        to="/dashboard/active"
        role="tab"
        class="tab"
        :class="{ 'tab-active': currentTab === 'active' }"
      >
        Active
      </NuxtLink>
      <NuxtLink
        to="/dashboard/past"
        role="tab"
        class="tab"
        :class="{ 'tab-active': currentTab === 'past' }"
      >
        Past
      </NuxtLink>
    </div>
    <slot />
  </main>
</template>
