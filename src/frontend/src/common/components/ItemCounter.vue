<template>
  <div class="counter counter--orange">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="count === min"
      @click="decreaseCounter"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" v-model="count" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="count === max"
      @click="increaseCounter"
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

  data() {
    return {
      count: this.value,
    };
  },

  methods: {
    increaseCounter() {
      this.count++;
      this.changeHandler();
    },

    decreaseCounter() {
      this.count--;
      this.changeHandler();
    },

    changeHandler() {
      this.$emit("change", this.count);
    },
  },
};
</script>

<style lang="scss" scoped></style>
