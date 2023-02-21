<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <router-link to="/" class="logo layout__logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>

      <router-link to="/orders" class="layout__link">
        История заказов
      </router-link>

      <router-link to="/profile" class="layout__link layout__link--active">
        Мои данные
      </router-link>
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <div class="user">
        <picture>
          <source type="image/webp" :srcset="userAvatar([2, 4], true, true)" />
          <img
            :src="userAvatar([2])"
            :srcset="userAvatar([4])"
            :alt="userName"
            width="72"
            height="72"
          />
        </picture>
        <div class="user__name">
          <span>{{ userName }}</span>
        </div>
        <p class="user__phone">
          Контактный телефон: <span>{{ userPhone }}</span>
        </p>
      </div>

      <template v-if="addresses.length || isAdding">
        <template v-if="addresses.length">
          <ProfileAddress
            v-for="address in addresses"
            :key="address.id"
            :address="address"
            @update="updateHandler"
            @remove="removeHandler"
          />
        </template>

        <div class="layout__address" v-if="isAdding">
          <ProfileAddressEdit
            :index="newAddressIndex"
            @saveData="createHandler"
            @remove="hideEditCard"
          />
        </div>
      </template>
      <template v-else>
        <p>Ваш список адресов пуст.</p>
      </template>

      <div class="layout__button">
        <button
          type="button"
          class="button button--border"
          :disabled="isAdding"
          @click="showEditCard"
        >
          Добавить новый адрес
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

import ProfileAddress from "@/modules/profile/components/ProfileAddress";
import ProfileAddressEdit from "@/modules/profile/components/ProfileAddressEdit";

import generateId from "@/common/mixins/generateId";

export default {
  name: "Profile",

  components: {
    ProfileAddress,
    ProfileAddressEdit,
  },

  mixins: [generateId],

  data() {
    return {
      isAdding: false,
    };
  },

  computed: {
    ...mapGetters("Auth", ["getUserAttribute", "addresses", "userAvatar"]),

    newAddressIndex() {
      return this.$generateId(this.addresses);
    },

    userName() {
      return this.getUserAttribute("name");
    },

    userPhone() {
      return this.getUserAttribute("phone");
    },
  },

  methods: {
    ...mapMutations("Auth", ["EDIT_ADDRESS"]),
    ...mapActions("Auth", ["createAddress", "updateAddress", "removeAddress"]),

    createHandler(entity) {
      entity.userId = this.getUserAttribute("id");

      this.createAddress(entity);
      this.hideEditCard();
    },

    updateHandler(entity) {
      this.updateAddress(entity);
    },

    removeHandler(id) {
      this.removeAddress(id);
    },

    showEditCard() {
      this.isAdding = true;
    },

    hideEditCard() {
      this.isAdding = false;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .address-form {
  margin-top: 8px;

  &:first-child {
    margin-top: 0;
  }
}
</style>
