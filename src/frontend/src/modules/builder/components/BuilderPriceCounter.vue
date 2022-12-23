<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <button type="submit" class="button" :disabled="disableButton">
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

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
    ...mapGetters("Builder", ["ingredientCount", "builderName"]),

    totalIngredientsPrice() {
      return this.ingredients.reduce((total, ingredient) => {
        return total + ingredient.price * ingredient.count;
      }, 0);
    },

    pizzaPrice() {
      const price =
        (this.dough.price + this.sauce.price + this.totalIngredientsPrice) *
        this.size.multi;

      return price;
    },

    disableButton() {
      return !(this.ingredientCount && this.builderName);
    },
  },

  watch: {
    pizzaPrice(newValue) {
      this.SET_BUILDER_PRICE(newValue);
    },
  },

  mounted() {
    this.SET_BUILDER_PRICE(this.pizzaPrice);
  },

  methods: {
    ...mapMutations("Builder", ["SET_BUILDER_PRICE"]),
  },
};
</script>
