<script setup lang="ts">
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useToast } from "primevue";
import { useAuthStore } from "@/stores/authStore";
import { toTypedSchema } from "@vee-validate/zod";
import { authSchema } from "@/schemas/user-schema";
import type { userAuth } from "@/models/auth.model";
import { Form, useForm } from "vee-validate";

const register = ref(false);
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const { errors } = useForm({
  validationSchema: authSchema,
});

const toast = useToast();
const authStore = useAuthStore();
const validationSchema = toTypedSchema(authSchema);

const submitForm = async () => {
  try {
    const formInputs: userAuth = {
      email: email.value,
      password: password.value,
    };

    if (register) {
      if (confirmPassword.value !== formInputs.password) {
        return;
      }
      await authStore.register(formInputs);
    } else {
      await authStore.login(formInputs);
    }
  } catch (err) {}
};
</script>

<template>
  <div class="max-w-sm mx-auto p-6">
    <div class="text-center mb-6">
      <ul class="flex justify-center space-x-4">
        <li>
          <button
            :class="{ 'is-active': !register }"
            class="py-2 px-4 text-sm font-semibold"
            @click.prevent="register = false"
          >
            Login
          </button>
        </li>
        <li>
          <button
            :class="{ 'is-active': register }"
            class="py-2 px-4 text-sm font-semibold"
            @click.prevent="register = true"
          >
            Register
          </button>
        </li>
      </ul>
    </div>

    <div class="card bg-white shadow-lg rounded-lg p-6">
      <div class="card-content">
        <div class="text-center text-xl font-bold mb-6">
          {{ register ? "Register" : "Login" }}
        </div>

        <Form @submit.prevent="submitForm" :validate-schema="authSchema">
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700"
              >Email</label
            >
            <InputText
              v-model="email"
              type="email"
              placeholder="e.g. alexsmith@gmail.com"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700"
              >Password</label
            >
            <InputText
              v-model="password"
              type="password"
              placeholder="********"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div v-if="register" class="mb-4">
            <label class="block text-sm font-semibold text-gray-700"
              >Confirm Password</label
            >
            <InputText
              v-model="confirmPassword"
              type="password"
              placeholder="********"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <Button
            type="submit"
            label="Continue"
            class="w-full p-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600"
          ></Button>
        </Form>
      </div>
    </div>
  </div>
</template>
