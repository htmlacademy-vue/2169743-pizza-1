<template>
  <label class="dough__input" :class="doughClass">
    <input
      type="radio"
      name="dought"
      :checked="label === selected"
      :value="doughType"
      class="visually-hidden"
      @input="handleInput"
    />
    <b>{{ label }}</b>
    <span>{{ description }}</span>
  </label>
</template>

<script>
export default {
  name: "BuilderDoughSelector",

  props: {
    label: {
      type: String,
      required: true,
      validator(value) {
        return !!value.trim();
      },
    },

    description: {
      type: String,
      required: true,
      validator(value) {
        return !!value.trim();
      },
    },

    selected: {
      type: String,
      required: true,
    },
  },

  computed: {
    isLightDough() {
      return this.label === "Тонкое";
    },

    doughType() {
      return this.isLightDough ? "light" : "large";
    },

    doughValue() {
      return this.isLightDough ? "small" : "big";
    },

    doughClass() {
      return `dough__input--${this.doughType}`;
    },
  },

  methods: {
    handleInput() {
      const dough = {};
      dough.name = this.label;
      dough.type = this.doughType;
      dough.value = this.doughValue;

      this.$emit("input", dough);
    },
  },
};
</script>
