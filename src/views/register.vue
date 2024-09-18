<template>
  <div class="py-8">
    <div class="mx-auto container px-8">
      <!-- Start: Form -->
      <form @submit.prevent="onSubmit" class="flex flex-col gap-6">
        <div class="row">
          <label for="fullName" class="flex flex-col">
            <span class="font-semibold text-gray-800">Full Name</span>
            <input
              id="fullName"
              type="text"
              placeholder="full name..."
              class="px-4 py-3 rounded-lg border-gray-200 mt-1 border"
              name="fullName"
              v-model="fullName"
            />
          </label>
        </div>
        <div class="row">
          <label for="email" class="flex flex-col">
            <span class="font-semibold text-gray-800">Email Address</span>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              class="px-4 py-3 rounded-lg border-gray-200 mt-1 border"
              name="email"
              v-model="email"
            />
          </label>
        </div>
        <div class="row">
          <label for="password" class="flex flex-col">
            <span class="font-semibold text-gray-800">Password</span>
            <input
              id="password"
              type="password"
              placeholder="password"
              class="px-4 py-3 rounded-lg border-gray-200 mt-1 border"
              name="password"
              v-model="password"
            />
          </label>
        </div>
        <div class="row">
          <button
            v-if="!isPending"
            type="submit"
            class="text-center w-full text-white bg-primary py-3 mt-3 border-0 rounded-lg"
          >
            Sign Up
          </button>
          <button
            v-else
            type="submit"
            class="text-center w-full text-white py-3 mt-3 border-0 rounded-lg bg-gray-800 cursor-not-allowed"
            disabled
          >
            Loading...
          </button>
        </div>
      </form>
      <!-- Start: Error -->
      <div class="text-left mt-4 text-rose-500" v-if="error">
        <span>{{ error }}</span>
      </div>
      <!-- Start: Direction -->
      <div class="w-full mt-6 text-center">
        <span class="font-semibold">I'm already a member.</span>
        <span class="ml-1 text-primary font-bold"
          ><router-link :to="{ name: 'Login', params: {} }"
            >Sign In</router-link
          ></span
        >
      </div>
    </div>
  </div>
</template>
<script>
import { useSignUp } from "@/composables/useSignup";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { error, isPending, signup } = useSignUp();
    const router = useRouter();
    const fullName = ref("");
    const email = ref("");
    const password = ref("");
    async function onSubmit() {
      await signup(email.value, password.value, fullName.value);
      if (!error.value) {
        router.push({ name: "Profile", params: {} });
      }
    }
    return {
      error,
      isPending,
      email,
      password,
      fullName,
      onSubmit,
    };
  },
};
</script>
