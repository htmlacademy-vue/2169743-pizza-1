<template>
  <div class="app-layout">
    <TheHeader />

    <slot />
  </div>
</template>

<script>
import TheHeader from "@/common/components/TheHeader";

export default {
  name: "AppLayout",

  components: {
    TheHeader,
  },
};
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;

  min-height: 100vh;
}
</style>
