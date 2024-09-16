<template>
  <div class="mt-8">
    <div class="mx-auto container px-8">
      <!-- Start: Form -->
      <form @submit.prevent="onLogin" class="flex flex-col gap-6">
        <div class="row">
          <label for="email" class="flex flex-col">
            <span class="font-semibold text-gray-700">Email Address</span>
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
            <span class="font-semibold text-gray-700">Password</span>
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
            Sign In
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
        <span class="font-semibold">I'm a new user.</span>
        <span class="ml-1 text-primary font-bold"
          ><router-link :to="{ name: 'Register', params: {} }"
            >Sign Up</router-link
          ></span
        >
      </div>
    </div>
  </div>
</template>
<script>
import { useSignIn } from "@/composables/useSignin";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { isPending, error, signin } = useSignIn();
    const email = ref("");
    const password = ref("");

    const router = useRouter();
    async function onLogin() {
      await signin(email.value, password.value);
      if (!error.value) {
        router.push({ name: "Home", params: {} });
      }
    }
    return {
      isPending,
      error,
      email,
      password,
      onLogin,
    };
  },
};
</script>
