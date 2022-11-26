<template>
  <div class="counter counter--orange">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="value === min"
      @click="countHandler('decrease')"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      disabled
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="value === max"
      @click="countHandler('increase')"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",

  props: {
    value: {
      type: Number,
      required: true,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: 10,
    },
  },

  methods: {
    countHandler(state) {
      this.$emit("increase", state);
    },
  },
};
</script>

<style lang="scss" scoped></style>
