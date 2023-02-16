<template>
  <div id="app">
    <Notifications />

    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { setAuth } from "@/common/helpers";

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

  created() {
    window.onerror = function (msg, url, line, col, err) {
      console.error(err);
    };

    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }

    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
