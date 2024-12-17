<script setup lang="ts">
import { useForm } from "vee-validate";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { ref } from "vue";
import { registerSchema } from "@/schemas/register-schema";
import { useAuthStore } from "@/stores/authStore";

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: registerSchema,
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [confirmPassword, confirmPasswordAttrs] = defineField("confirmPassword");

const authStore = useAuthStore();
const isPending = ref(false);

const onSubmit = handleSubmit(async (values) => {
  isPending.value = true;
  try {
    await authStore.register(values);
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
        placeholder="********"
        class="w-full p-2 border border-gray-300 rounded-md"
      />
      <div class="text-red-500 text-sm">{{ errors.password }}</div>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-semibold">Confirm Password</label>
      <InputText
        v-model="confirmPassword"
        v-bind="confirmPasswordAttrs"
        type="password"
        placeholder="********"
        class="w-full p-2 border border-gray-300 rounded-md"
      />
      <div class="text-red-500 text-sm">{{ errors.confirmPassword }}</div>
    </div>

    <Button
      type="submit"
      :disabled="isPending"
      label="Register"
      class="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    />
  </form>
</template>
