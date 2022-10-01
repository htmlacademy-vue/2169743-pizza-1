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
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSauceSelector",

  components: {
    RadioButton,
  },

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

      switch (label) {
        case "Сливочный":
          value = "creamy";
          break;
        default:
          value = "tomato";
          break;
      }

      return value;
    },

    handleInput(dataItem) {
      this.$emit("select", dataItem);
    },
  },
};
</script>
