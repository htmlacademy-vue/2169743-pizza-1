<template>
  <div class="ingredients__sauce">
    <slot />

    <RadioButton
      v-for="item in items"
      :key="item.id"
      class="ingredients__input"
      name="sauce"
      :value="sauceValue(item.name)"
      :label="item.name"
      :selected="selected"
      @input="handleInput"
    />
  </div>
</template>

<script>
const cream = {
  creamy: "Сливочный",
  tomato: "Томатный",
};

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
    },
  },

  methods: {
    sauceValue(label) {
      let value = "";

      for (const key in cream) {
        if (label === cream[key]) {
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
