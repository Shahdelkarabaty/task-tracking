<script setup lang="ts">
import { useForm } from "vee-validate";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { ref } from "vue";
import { loginSchema } from "@/schemas/login-schema";
import { useAuthStore } from "@/stores/authStore";

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: loginSchema,
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const authStore = useAuthStore();
const isPending = ref(false);

const onSubmit = handleSubmit(async (values) => {
  isPending.value = true;
  try {
    await authStore.login(values);
  } finally {
    isPending.value = false;
  }
});
</script>

<template>
  <form @submit="onSubmit" class="max-w-sm mx-auto p-6">
    <div class="mb-4">
      <label class="block text-sm font-semibold">Email</label>
      <InputText
        v-model="email"
        v-bind="emailAttrs"
        placeholder="e.g. alexsmith@gmail.com"
        class="w-full p-2 border border-gray-300 rounded-md"
      />
      <div class="text-red-500 text-sm">{{ errors.email }}</div>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-semibold">Password</label>
      <InputText
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        placeholder="******"
        class="w-full p-2 border border-gray-300 rounded-md"
      />
      <div class="text-red-500 text-sm">{{ errors.password }}</div>
    </div>

    <Button
      type="submit"
      :disabled="isPending"
      label="Login"
      class="w-full p-2 text-white rounded-md"
    />
  </form>
</template>
