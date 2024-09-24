<template>
  <div class="container mx-auto p-8">
    <div class="flex justify-between items-center">
      <h3 class="text-xl font-semibold">
        <span v-if="meta.name == 'Home'"> {{ meta.heading }}</span>
        <span v-else> {{ meta.heading }}</span>
      </h3>
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
    const meta = computed(() => route.meta);
    return { meta };
  },
};
</script>
