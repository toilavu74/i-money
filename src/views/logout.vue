<template>
  <h1>Logout loading...</h1>
</template>
<script>
import { useRouter } from "vue-router";
import { useLogout } from "@/composables/useLogout";
export default {
  setup() {
    const { error, logout } = useLogout();
    const router = useRouter();
    async function onLogout() {
      await logout();
      if (!error.value) {
        router.push({ name: "Login", params: {} });
      }
    }
    onLogout();
  },
};
</script>
