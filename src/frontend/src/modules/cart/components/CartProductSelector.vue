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
          <li>
            {{ order.size.diametr }}, на
            {{ doughLabel }}
            тесте
          </li>
          <li>Соус: {{ sauceLabel }}</li>
          <li>Начинка: {{ fillings }}</li>
        </ul>
      </div>
    </div>

    <ItemCounter
      class="cart-list__counter"
      :value="countValue"
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
import { mapMutations } from "vuex";

import ItemCounter from "@/common/components/ItemCounter";

import productCount from "@/mixins/productCount.js";

export default {
  name: "CartProductSelector",

  components: {
    ItemCounter,
  },

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
    doughLabel() {
      return this.order.dough.type === "light" ? "тонком" : "толстом";
    },

    sauceLabel() {
      return this.order.sauce.name.toLowerCase();
    },

    fillings() {
      return this.order.ingredients
        .map((el) => el.name.toLowerCase())
        .join(", ");
    },

    totalPrice() {
      return this.order.price * this.order.count;
    },
  },

  methods: {
    ...mapMutations("Builder", [
      "SET_BUILDER",
      "SET_BUILDER_NAME",
      "SET_BUILDER_PRICE",
    ]),

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
