<script setup lang="ts">
import { ref } from "vue";
import Register from "./register.vue";
import Login from "./login.vue";

const isRegister = ref(false);
</script>

<template>
  <div class="p-6 max-w-lg mx-auto">
    <div class="flex justify-around mb-4">
      <button
        :class="{ 'font-bold underline': !isRegister }"
        @click="isRegister = false"
        class="text-lg"
      >
        Login
      </button>
      <button
        :class="{ 'font-bold underline': isRegister }"
        @click="isRegister = true"
        class="text-lg"
      >
        Register
      </button>
    </div>
    <component :is="isRegister ? Register : Login" />
  </div>
</template>
