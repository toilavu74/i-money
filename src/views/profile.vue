<template>
  <!-- Start: Infor -->
  <div class="row" v-if="user">
    <div class="container mx-auto p-8">
      <div class="text-center">
        <div class="images w-24 h-24 mx-auto overflow-hidden rounded-full">
          <img
            src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/02/avatar-bua-cho-FB.jpg?ssl\u003d1"
            alt="User Profile"
          />
        </div>
        <div class="mt-2">
          <h3 class="font-bold text-primary text-xl">{{ user.displayName }}</h3>
          <p>{{ user.email }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- Start: Menu -->
  <div class="row">
    <div class="container mx-auto p-8">
      <h3 class="font-bold text-primary text-xl mb-3">Genneral</h3>
      <ul class="flex flex-col gap-y-3">
        <li
          v-for="(profileOption, index) in profileOptions"
          :key="profileOption.name"
        >
          <router-link
            class="flex justify-between items-center"
            :to="profileOption.router"
          >
            <div
              class="text-left flex items-center gap-x-2"
              :class="{ 'text-red': index === profileOptions.length - 1 }"
            >
              <i class="text-xl" :class="profileOption.icon"></i>
              <p>{{ profileOption.name }}</p>
            </div>
            <div class="text-right">
              <i class="t2ico-arrow-right"></i>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
import { useUser } from "@/composables/useUser";
export default {
  setup() {
    const profileOptions = reactive([
      {
        name: "My wallet",
        icon: "t2ico-wallet",
        router: {
          name: "Transactions",
          params: {},
        },
      },
      {
        name: "Category",
        icon: "t2ico-ticket-star",
        router: {
          name: "Category",
          params: {},
        },
      },
      {
        name: "Privacy",
        icon: "t2ico-lock",
        router: {
          name: "Home",
          params: {},
        },
      },
      {
        name: "About",
        icon: "t2ico-info-square",
        router: {
          name: "Home",
          params: {},
        },
      },
      {
        name: "Logout",
        icon: "t2ico-logout",
        router: {
          name: "Logout",
          params: {},
        },
      },
    ]);
    const { getUser } = useUser();
    const { user } = getUser();
    return { user, profileOptions };
  },
};
</script>
