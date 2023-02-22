<template>
  <div class="layout__sidebar sidebar">
    <template v-if="sidebarMenu.length">
      <router-link
        v-for="link in sidebarMenu"
        :key="link.id"
        :to="link.route"
        class="layout__link"
        :class="{ 'layout__link--active': link.id === sidebarActiveTab }"
        @click.native="handleClick(link.id)"
      >
        {{ link.label }}
      </router-link>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AppSidebar",

  computed: {
    ...mapGetters(["sidebarMenu", "sidebarActiveTab"]),
  },

  methods: {
    ...mapMutations(["CHANGE_SIDEBAR_ACTIVE_TAB"]),

    handleClick(id) {
      this.CHANGE_SIDEBAR_ACTIVE_TAB(id);
    },
  },
};
</script>
