<template>
  <div class="layout__sidebar sidebar" data-test="sidebar">
    <template v-if="sidebarMenu.length">
      <router-link
        v-for="link in sidebarMenu"
        :key="link.id"
        :to="link.route"
        class="layout__link"
        active-class="layout__link--active"
        exact-path
      >
        {{ link.label }}
      </router-link>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppSidebar",

  computed: {
    ...mapState(["sidebarMenu"]),
  },
};
</script>
