<template>
  <div id="app">
    <PageConstructor />
  </div>
</template>

<script>
import PageConstructor from "@/views/Index";

export default {
  name: "App",

  components: {
    PageConstructor,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
