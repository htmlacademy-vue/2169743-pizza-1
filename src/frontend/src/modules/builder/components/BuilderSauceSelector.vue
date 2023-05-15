<template>
  <div class="ingredients__sauce">
    <slot />

    <AppRadioButton
      v-for="item in items"
      :key="item.id"
      class="ingredients__input"
      name="sauce"
      :value="sauceValue(item.name)"
      :label="item.name"
      :selected="selected"
      data-test="sauce-radio"
      @input="handleInput"
    />
  </div>
</template>

<script>
import CREAM from "@/common/enums/cream";

export default {
  name: "BuilderSauceSelector",

  props: {
    items: {
      type: Array,
      required: true,
    },

    selected: {
      type: String,
      required: true,
      validator(value) {
        return !!value.trim();
      },
    },
  },

  methods: {
    sauceValue(label) {
      let value = "";

      for (const key in CREAM) {
        if (label === CREAM[key]) {
          value = key;
        }
      }

      return value;
    },

    handleInput(dataItem) {
      this.$emit("select", dataItem);
    },
  },
};
</script>
