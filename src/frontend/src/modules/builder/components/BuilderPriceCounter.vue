<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <button type="button" class="button" disabled>Готовьте!</button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",

  props: {
    dough: {
      type: Object,
      required: true,
    },

    sauce: {
      type: Object,
      required: true,
    },

    size: {
      type: Object,
      required: true,
    },

    ingredients: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    totalIngredientsPrice() {
      return this.ingredients.reduce((total, ingredient) => {
        return total + ingredient.price * ingredient.count;
      }, 0);
    },

    pizzaPrice() {
      const price =
        this.dough.price + this.sauce.price + this.totalIngredientsPrice;
      return this.size.multi * price;
    },
  },
};
</script>
