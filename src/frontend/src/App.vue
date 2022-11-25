<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",

  components: {
    DefaultLayout,
    AppLayout,
  },

  computed: {
    layout() {
      return (this.$route.meta.layout ?? "Default") + "Layout";
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
