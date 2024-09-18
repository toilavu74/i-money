<template>
  <div class="container mx-auto p-8">
    <div class="flex justify-between items-center">
      <h3 class="text-xl font-semibold">{{ meta.heading }}</h3>
      <i class="t2ico-setting text-xl"></i>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    //console.log(router);
    const meta = computed(() => route.meta);
    return { meta };
  },
};
</script>
