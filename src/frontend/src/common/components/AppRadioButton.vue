<template>
  <label class="radio">
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="label === selected"
      @input="handleInput"
    />
    <span>
      {{ label }}
    </span>
  </label>
</template>

<script>
export default {
  name: "AppRadioButton",

  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: [String, Number, Boolean],
      required: true,
    },

    label: {
      type: String,
      required: true,
    },

    selected: {
      type: String,
      required: true,
    },
  },

  methods: {
    handleInput() {
      const dataItem = {};
      dataItem.name = this.label;
      dataItem.value = this.value;

      this.$emit("input", dataItem);
    },
  },
};
</script>
