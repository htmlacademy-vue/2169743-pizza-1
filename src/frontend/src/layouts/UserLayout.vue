<template>
  <div class="user-layout">
    <AppHeader data-test="header" />

    <main class="layout">
      <AppSidebar data-test="sidebar" />

      <slot />
    </main>
  </div>
</template>

<script>
import AppHeader from "@/common/components/AppHeader";
import AppSidebar from "@/common/components/AppSidebar";

export default {
  name: "UserLayout",

  components: {
    AppHeader,
    AppSidebar,
  },
};
</script>
