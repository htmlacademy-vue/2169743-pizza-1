<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="value <= min"
      @click="countHandler('decrease')"
      data-test="buttonMinus"
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
      :class="buttonClass"
      :disabled="value >= max"
      @click="countHandler('increase')"
      data-test="buttonPlus"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
const COLORS = ["orange"];

export default {
  name: "AppItemCounter",

  props: {
    value: {
      type: Number,
      default: 0,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: 99,
    },

    color: {
      type: String,
      validator(value) {
        return COLORS.includes(value);
      },
    },
  },

  computed: {
    buttonClass() {
      const modificator = `counter__button--${this.color}`;

      return {
        [modificator]: this.color,
      };
    },
  },

  methods: {
    countHandler(state) {
      this.$emit("change", state);
    },
  },
};
</script>
