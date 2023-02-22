<template>
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
      <template v-if="isAuthenticated">
        <router-link to="/profile">
          <picture>
            <source type="image/webp" :srcset="userAvatar([1, 2], true)" />
            <img
              :src="userAvatar"
              :srcset="userAvatar([2])"
              :alt="getUserAttribute('name')"
              width="32"
              height="32"
            />
          </picture>
          <span>{{ getUserAttribute("name") }}</span>
        </router-link>
        <a href="#" class="header__logout" @click.prevent="$logout">
          <span>Выйти</span>
        </a>
      </template>
      <template v-else>
        <router-link to="/login" class="header__login">
          <span>Войти</span>
        </router-link>
      </template>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import logout from "@/common/mixins/logout";

export default {
  name: "AppSidebar",

  mixins: [logout],

  computed: {
    ...mapState("Auth", ["isAuthenticated"]),
    ...mapGetters("Auth", ["getUserAttribute", "userAvatar"]),
    ...mapGetters("Cart", ["orderPrice"]),
  },
};
</script>
