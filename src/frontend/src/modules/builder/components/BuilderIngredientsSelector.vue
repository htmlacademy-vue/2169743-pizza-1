<template>
  <component :is="tag">
    <span class="filling" :class="ingredientClass">
      {{ label }}
    </span>

    <ItemCounter
      :value="value"
      class="ingredients__counter"
      :max="3"
      @change="changeCount"
    />
  </component>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    ItemCounter,
  },

  props: {
    tag: {
      type: String,
      default: "div",
    },

    label: {
      type: String,
      required: true,
    },

    value: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    ingredientValue() {
      let value = "";

      switch (this.label) {
        case "Ананас":
          value = "ananas";
          break;
        case "Бекон":
          value = "bacon";
          break;
        case "Блю чиз":
          value = "blue_cheese";
          break;
        case "Чеддер":
          value = "cheddar";
          break;
        case "Чили":
          value = "chile";
          break;
        case "Ветчина":
          value = "ham";
          break;
        case "Халапеньо":
          value = "jalapeno";
          break;
        case "Моцарелла":
          value = "mozzarella";
          break;
        case "Грибы":
          value = "mushrooms";
          break;
        case "Маслины":
          value = "olives";
          break;
        case "Лук":
          value = "onion";
          break;
        case "Пармезан":
          value = "parmesan";
          break;
        case "Салями":
          value = "salami";
          break;
        case "Лосось":
          value = "salmon";
          break;
        default:
          value = "tomatoes";
          break;
      }

      return value;
    },

    ingredientClass() {
      return `filling--${this.ingredientValue}`;
    },
  },

  methods: {
    changeCount(count) {
      const filling = {};
      filling.name = this.label;
      filling.value = this.ingredientValue;
      filling.count = count;

      this.$emit("change", filling);
    },
  },
};
</script>
