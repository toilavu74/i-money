<template>
  <footer class="footer fixed bottom-0 left-0 w-full bg-white">
    <div
      class="container mx-auto p-4 relative"
      :class="{ mr: meta.isShowFooter }"
    >
      <div class="row w-full text-center" v-if="meta.isShowFooter">
        <div
          @click="onNewTransaction"
          class="plus w-14 h-14 bg-primary rounded-full absolute -top-1/2 left-0 right-0 mx-auto flex items-center justify-center"
        >
          <i class="t2ico-plus text-2xl text-white"></i>
        </div>
      </div>
      <div class="row">
        <div class="grid-cols-4 grid">
          <div
            class="items text-center"
            v-for="navItem in navItems"
            :key="navItem.name"
          >
            <router-link class="block" :to="{ name: navItem.name, params: {} }">
              <i class="text-xl" :class="navItem.icon"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<style>
.footer .mr .items:nth-child(2) {
  margin-left: -40px;
}
.footer .mr .items:nth-child(3) {
  margin-right: -40px;
}
</style>
<script>
import { useRouter, useRoute } from "vue-router";
import { reactive, computed } from "vue";
export default {
  setup() {
    const navItems = reactive([
      {
        icon: "t2ico-category",
        name: "Home",
        text: "Home",
      },
      {
        icon: "t2ico-chart",
        name: "Report",
        text: "Report",
      },
      {
        icon: "t2ico-presentation",
        name: "Budget",
        text: "Budget",
      },
      {
        icon: "t2ico-profile",
        name: "Profile",
        text: "Profile",
      },
    ]);
    const router = useRouter();

    const route = useRoute();
    const meta = computed(() => route.meta);
    function onNewTransaction() {
      router.push({ name: "NewTransaction", params: {} });
    }
    return { navItems, onNewTransaction, meta };
  },
};
</script>
