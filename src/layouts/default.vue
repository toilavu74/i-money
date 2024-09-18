<template>
  <nav-top />
  <slot />
  <nav-bottom />
</template>
<script>
import NavBottom from "@/components/NavBottom.vue";
import NavTop from "@/components/NavTop.vue";
export default {
  components: {
    NavBottom,
    NavTop,
  },
};
</script>
