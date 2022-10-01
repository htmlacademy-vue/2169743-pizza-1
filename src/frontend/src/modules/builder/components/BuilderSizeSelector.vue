<template>
  <label class="diameter__input" :class="sizeClass">
    <input
      type="radio"
      name="diameter"
      :value="sizeValue"
      :checked="selected === label"
      class="visually-hidden"
      @input="handleInput"
    />
    <span>{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: "BuilderSizeSelector",

  props: {
    label: {
      type: String,
      required: true,
    },

    selected: {
      type: String,
      required: true,
    },
  },

  computed: {
    sizeClass() {
      let modificator = "";

      switch (this.label) {
        case "32 см":
          modificator = "normal";
          break;
        case "45 см":
          modificator = "big";
          break;
        default:
          modificator = "small";
          break;
      }

      return `diameter__input--${modificator}`;
    },

    sizeValue() {
      let value = "";

      switch (this.label) {
        case "32 см":
          value = "normal";
          break;
        case "45 см":
          value = "big";
          break;
        default:
          value = "small";
          break;
      }

      return value;
    },
  },

  methods: {
    handleInput() {
      this.$emit("input", this.label);
    },
  },
};
</script>
