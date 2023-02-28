<template>
  <div class="product">
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="productName"
    />
    <div class="product__text">
      <h2>{{ productName }}</h2>
      <ul>
        <li>{{ doughText(sizeId, doughId) }}</li>
        <li>{{ sauceText(sauceId) }}</li>
        <li>{{ ingredientsText(ingredients) }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppProduct",

  props: {
    productName: {
      type: String,
      default: "",
    },

    sizeId: {
      type: Number,
      default: 0,
    },

    doughId: {
      type: Number,
      default: 0,
    },

    sauceId: {
      type: Number,
      default: 0,
    },

    ingredients: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapGetters(["doughText", "sauceText", "ingredientsText"]),
  },
};
</script>
