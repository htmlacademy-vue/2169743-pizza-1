<template>
  <component :is="tag">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="order.name"
      />
      <div class="product__text">
        <h2>{{ order.name }}</h2>
        <ul>
          <li>{{ doughText(order.size.id, order.dough.id) }}</li>
          <li>{{ sauceText(order.sauce.id) }}</li>
          <li>{{ ingredientsText(order.ingredients) }}</li>
        </ul>
      </div>
    </div>

    <AppItemCounter
      class="cart-list__counter"
      :value="$countValue"
      color="orange"
      @change="changeCount"
    />

    <div class="cart-list__price">
      <b>{{ totalPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit" @click="changeBuilder">
        Изменить
      </button>
    </div>
  </component>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import productCount from "@/common/mixins/productCount.js";

export default {
  name: "CartProductSelector",

  mixins: [productCount],

  props: {
    tag: {
      type: String,
      default: "div",
    },

    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters(["doughText", "sauceText", "ingredientsText"]),

    totalPrice() {
      return this.order.price * this.order.quantity;
    },
  },

  methods: {
    ...mapMutations("Builder", ["SET_BUILDER", "SET_BUILDER_NAME"]),

    changeCount(state) {
      const builder = {};
      builder.id = this.id;
      builder.name = this.order.name;
      builder.countState = state;

      this.$emit("change", builder);
    },

    changeBuilder() {
      this.SET_BUILDER(this.order);
      this.$router.push("/");
    },
  },
};
</script>
