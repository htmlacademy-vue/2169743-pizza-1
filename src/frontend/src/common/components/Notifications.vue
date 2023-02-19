<template>
  <div v-if="notifications.length" class="notification__wrapper">
    <div
      v-for="({ text, type }, index) in notifications"
      :key="index"
      class="notification"
      :class="notificationClass(type)"
    >
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Notification",

  computed: {
    ...mapState(["notifications"]),
  },

  methods: {
    notificationClass(type) {
      return `notification--${type}`;
    },
  },
};
</script>

<style lang="scss" scoped>
$red-300: #e57373;
$red-600: #e53935;

$blue-300: #b2ebf2;
$blue-600: #1e88e5;

$orange-600: #ff9800;

.notification {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  margin-top: 5px;
  padding: 20px;

  text-align: center;

  color: $white;
  border-bottom: 2px solid transparent;

  &:first-child {
    margin-top: 0;
  }

  &--info {
    border-color: $blue-600;
    background: $blue-300;
  }

  &--error {
    border-color: $red-600;
    background: $red-300;
  }

  &--success {
    border-color: $green-600;
    background: $green-300;
  }

  &--warning {
    border-color: $orange-600;
    background: $orange-300;
  }

  &__wrapper {
    position: fixed;
    z-index: 9999;
    top: 15px;
    right: 0;

    width: 420px;
    padding: 10px;
  }
}
</style>
