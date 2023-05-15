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
      required: true,
      validator(value) {
        return !!value.trim();
      },
    },

    sizeId: {
      type: Number,
      required: true,
    },

    doughId: {
      type: Number,
      required: true,
    },

    sauceId: {
      type: Number,
      required: true,
    },

    ingredients: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters(["doughText", "sauceText", "ingredientsText"]),
  },
};
</script>
