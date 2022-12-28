<template>
  <component
    :is="tag"
    :draggable="draggable"
    :id="ingredientValue"
    @dragstart="dragStart"
    @dragover.stop
  >
    <span class="filling" :class="ingredientClass">
      {{ label }}
    </span>

    <ItemCounter
      class="ingredients__counter"
      :value="countValue"
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

    selected: {
      type: Array,
      default: () => [],
    },

    draggable: {
      type: Boolean,
      default: false,
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

    countValue() {
      let value = 0;

      if (this.selected.length) {
        this.selected.forEach((item) => {
          if (item.name === this.label) {
            value = item.count;
          }
        });
      }

      return value;
    },
  },

  methods: {
    changeCount(state) {
      const filling = {};
      filling.name = this.label;
      filling.value = this.ingredientValue;
      filling.countState = state;

      this.$emit("change", filling);
    },

    dragStart(e) {
      const ingredient = {};
      ingredient.name = this.label;
      ingredient.value = this.ingredientValue;

      e.dataTransfer.setData("ingredientData", JSON.stringify(ingredient));
    },
  },
};
</script>
