<template>
  <div class="app-layout">
    <header class="header">
      <div class="header__logo">
        <router-link to="/" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>
      </div>
      <div class="header__cart">
        <router-link to="/cart">{{ orderPrice }} ₽</router-link>
      </div>
      <div class="header__user">
        <router-link to="/login" class="header__login">
          <span>Войти</span>
        </router-link>
      </div>
    </header>

    <slot />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppLayout",

  computed: {
    ...mapGetters("Orders", ["orderPrice"]),
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
