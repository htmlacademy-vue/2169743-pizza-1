<template>
  <div class="app-layout">
    <AppHeader />

    <slot />
  </div>
</template>

<script>
import AppHeader from "@/common/components/AppHeader";

export default {
  name: "AppLayout",

  components: {
    AppHeader,
  },
};
</script>
