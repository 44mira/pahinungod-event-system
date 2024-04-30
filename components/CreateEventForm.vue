<script setup>
import { useForm } from "@vorms/core";
import { zodResolver } from "@vorms/resolvers/zod";
import { inject } from "vue";
import z from "zod";

const supabase = inject("supabase");
const emit = defineEmits(["create"]);

// dummy default admin
const adminSession = "87840845-fc64-4290-86b0-a112e42d8dfe";

const { register, errors, handleSubmit } = useForm({
  initialValues: {
    admin_id: adminSession,
    name: "",
    location: "",
    event_time: "",
    orientation_time: "",
    description: "",
  },
  validate: zodResolver(
    z.object({
      admin_id: z.string().uuid(),
      name: z.string().min(1, "Name is required!"),
      event_time: z.coerce.date({ message: "Invalid date!" }),
      orientation_time: z.coerce.date({ message: "Invalid date!" }),
      location: z.string().min(1, "Location is required!"),
      description: z.string(),
    }),
  ),
  onSubmit: async (values) => {
    const timeDifference = (new Date(values.event_time) - new Date()) / 3600000; // difference in days
    let status = "active";
    if (timeDifference > 1) status = "upcoming";
    else if (timeDifference < -1) status = "past";

    await supabase.from("events").insert({ ...values, status: status });
    await refreshNuxtData();
    emit("create");
  },
});

const { value: admin_id, attrs: adminIdAttrs } = register("admin_id");
const { value: name, attrs: nameAttrs } = register("name");
const { value: location, attrs: locationAttrs } = register("location");
const { value: event_time, attrs: eventTimeAttrs } = register("event_time");
const { value: orientation_time, attrs: orientationTimeAttrs } =
  register("orientation_time");
const { value: description, attrs: descriptionAttrs } = register("description");
</script>

<template>
  <form @submit="handleSubmit" class="p-4 grid grid-cols-2 gap-2">
    <div>
      <div class="label">
        <span class="label-text">Event Name:</span>
      </div>
      <input
        class="input input-bordered w-full"
        :class="{ 'input-error': errors.name }"
        type="text"
        v-model="name"
        v-bind="nameAttrs"
      />
      <div class="text-error text-sm">
        {{ errors.name }}
      </div>
    </div>
    <div>
      <div class="label">
        <span class="label-text">Admin ID:</span>
      </div>
      <input
        class="input input-bordered w-full"
        type="text"
        v-model="admin_id"
        v-bind="adminIdAttrs"
        disabled
      />
    </div>
    <div class="col-span-2">
      <div class="label">
        <span class="label-text">Location:</span>
      </div>
      <input
        class="input input-bordered w-full"
        :class="{ 'input-error': errors.location }"
        type="text"
        v-model="location"
        v-bind="locationAttrs"
      />
      <div class="text-error text-sm">
        {{ errors.location }}
      </div>
    </div>
    <div>
      <div class="label">
        <span class="label-text">Event Time:</span>
      </div>
      <input
        class="input input-bordered w-full"
        :class="{ 'input-error': errors.event_time }"
        type="datetime-local"
        v-model="event_time"
        v-bind="eventTimeAttrs"
      />
      <div class="text-error text-sm">
        {{ errors.event_time }}
      </div>
    </div>
    <div>
      <div class="label">
        <span class="label-text">Orientation Time:</span>
      </div>
      <input
        class="input input-bordered w-full"
        :class="{ 'input-error': errors.orientation_time }"
        type="datetime-local"
        v-model="orientation_time"
        v-bind="orientationTimeAttrs"
      />
      <div class="text-error text-sm">
        {{ errors.orientation_time }}
      </div>
    </div>
    <div class="col-span-2">
      <div class="label">
        <span class="label-text">Description:</span>
      </div>
      <textarea
        class="textarea textarea-bordered w-full"
        type="text"
        :class="{ 'input-error': errors.description }"
        v-model="description"
        v-bind="descriptionAttrs"
      />
      <div class="text-error text-sm">
        {{ errors.description }}
      </div>
    </div>

    <button type="submit" class="btn mt-5 w-fit btn-accent">
      CREATE EVENT
    </button>
  </form>
</template>
