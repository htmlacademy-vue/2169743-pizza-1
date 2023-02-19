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
const ingredient = {
  ananas: "Ананас",
  bacon: "Бекон",
  blue_cheese: "Блю чиз",
  cheddar: "Чеддер",
  chile: "Чили",
  ham: "Ветчина",
  jalapeno: "Халапеньо",
  mozzarella: "Моцарелла",
  mushrooms: "Грибы",
  olives: "Маслины",
  onion: "Лук",
  parmesan: "Пармезан",
  salami: "Салями",
  salmon: "Лосось",
  tomatoes: "Томаты",
};

export default {
  name: "BuilderIngredientsSelector",

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

      for (const key in ingredient) {
        if (this.label === ingredient[key]) {
          value = key;
        }
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
            value = item.quantity;
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
