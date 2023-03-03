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

import calcPrice from "@/common/mixins/calcPrice";

export default {
  name: "BuilderPriceCounter",

  mixins: [calcPrice],

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

    pizzaPrice() {
      return this.$calcPizzaPrice({
        dough: this.dough,
        sauce: this.sauce,
        size: this.size,
        ingredients: this.ingredients,
      });
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
