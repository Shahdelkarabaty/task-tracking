<script setup lang="ts">
import { ref } from "vue";
import Register from "./register.vue";
import Login from "./login.vue";

const isRegister = ref(false);
</script>

<template>
  <div class="p-6 max-w-lg mx-auto">
    <div class="flex justify-center space-x-4">
      <button
        :class="{ 'font-bold underline': !isRegister }"
        @click="isRegister = false"
        class="text-sm"
      >
        Login
      </button>
      <button
        :class="{ 'font-bold underline': isRegister }"
        @click="isRegister = true"
        class="text-sm"
      >
        Register
      </button>
    </div>
    <component :is="isRegister ? Register : Login" />
  </div>
</template>
