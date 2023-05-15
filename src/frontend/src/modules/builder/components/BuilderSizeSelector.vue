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
      validator(value) {
        return !!value.trim();
      },
    },

    selected: {
      type: String,
      required: true,
      validator(value) {
        return !!value.trim();
      },
    },
  },

  computed: {
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

    sizeClass() {
      return `diameter__input--${this.sizeValue}`;
    },
  },

  methods: {
    handleInput() {
      this.$emit("input", this.label);
    },
  },
};
</script>
