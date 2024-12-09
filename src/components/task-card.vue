<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  title: String,
  status: String,
  deadline: String,
  getStatusClass: Function, 
});
</script>

<template>
  <div class="p-4 bg-white shadow-md rounded-md">
    <h3 class="text-lg font-semibold">{{ title }}</h3>
    <p class="text-sm text-gray-600">Deadline: {{ deadline }}</p>
    <p :class="getStatusClass(status)" class="text-sm">
      Status: {{ status }}
    </p>
    <div class="mt-4">
      <slot></slot> 
    </div>
  </div>
</template>
