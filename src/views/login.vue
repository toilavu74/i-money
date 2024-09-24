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
          <span v-if="emailError" class="text-red mt-2 block">{{
            emailError
          }}</span>
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
          <span v-if="passwordError" class="text-red mt-2 block">{{
            passwordError
          }}</span>
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
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
export default {
  setup() {
    const { isPending, error, signin } = useSignIn();
    const router = useRouter();
    const schema = yup.object({
      email: yup
        .string()
        .required("Email cannot be blank")
        .email("Invalid Email"),
      password: yup
        .string()
        .required("Password cannot be blank")
        .min(6, "Password must be at least 6 characters long"),
    });
    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    const { value: email, errorMessage: emailError } = useField("email");
    const { value: password, errorMessage: passwordError } =
      useField("password");
    const onLogin = handleSubmit(async () => {
      await signin(email.value, password.value);
      if (!error.value) {
        router.push({ name: "Profile", params: {} });
      }
    });
    return {
      isPending,
      error,
      email,
      password,
      emailError,
      passwordError,
      onLogin,
    };
  },
};
</script>
