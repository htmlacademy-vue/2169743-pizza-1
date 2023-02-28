<template>
  <component :is="tag">
    <AppProduct
      :productName="order.name"
      :sizeId="order.size.id"
      :doughId="order.dough.id"
      :sauceId="order.sauce.id"
      :ingredients="order.ingredients"
    />
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
import { mapMutations } from "vuex";

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
