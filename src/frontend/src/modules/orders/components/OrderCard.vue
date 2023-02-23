<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ calcPrice }} ₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="handleRemove"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button type="button" class="button" @click="handleRepeat">
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <li
        class="order__item"
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
      >
        <div class="product">
          <img
            src="@/assets/img/product.svg"
            class="product__img"
            width="56"
            height="56"
            :alt="pizza.name"
          />
          <div class="product__text">
            <h2>{{ pizza.name }}</h2>
            <ul>
              <li>{{ doughText(pizza.sizeId, pizza.doughId) }}</li>
              <li>{{ sauceText(pizza.sauceId) }}</li>
              <li>{{ ingredientsText(pizza.ingredients) }}</li>
            </ul>
          </div>
        </div>
        <p class="order__price">{{ pizzaPriceLabel(pizza) }} ₽</p>
      </li>
    </ul>

    <ul class="order__additional">
      <li v-for="{ id, miscId, quantity } in order.orderMisc" :key="id">
        <img
          :src="getAttrItemEntity('misc', miscId, 'image')"
          width="20"
          height="30"
          :alt="getAttrItemEntity('misc', miscId, 'name')"
        />
        <p>
          <span>{{ getAttrItemEntity("misc", miscId, "name") }}</span>
          <b>{{ miscPriceLabel(miscId, quantity) }} ₽</b>
        </p>
      </li>
    </ul>

    <p class="order__address" v-if="order.orderAddress">
      Адрес доставки:
      {{ orderAddress(order) }}
    </p>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import calcPrice from "@/common/mixins/calcPrice.js";

export default {
  name: "OrderCard",

  mixins: [calcPrice],

  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters([
      "getItemEntity",
      "getAttrItemEntity",
      "doughText",
      "sauceText",
      "ingredientsText",
    ]),
    ...mapGetters("Auth", ["getAddressById", "addressText"]),

    pizzaCost() {
      const { orderPizzas } = this.order;

      return orderPizzas?.reduce((total, pizza) => {
        return total + this.pizzaPrice(pizza) * pizza.quantity;
      }, 0);
    },

    miscCost() {
      const { orderMisc } = this.order;

      const cost =
        orderMisc?.reduce((total, misc) => {
          const price = this.getAttrItemEntity("misc", misc.miscId, "price");
          return total + price * misc.quantity;
        }, 0) ?? 0;

      return cost;
    },

    calcPrice() {
      return this.pizzaCost + this.miscCost;
    },
  },

  methods: {
    pizzaPrice({ doughId, sauceId, sizeId, ingredients }) {
      const dough = this.getItemEntity("dough", doughId);
      const sauce = this.getItemEntity("sauces", sauceId);
      const size = this.getItemEntity("sizes", sizeId);
      const ingredientsData = ingredients.map((el) => {
        const tmpIngredient = this.getItemEntity(
          "ingredients",
          el.ingredientId
        );
        tmpIngredient.quantity = el.quantity;

        return tmpIngredient;
      });

      return this.$calcPizzaPrice({
        dough,
        sauce,
        size,
        ingredients: ingredientsData,
      });
    },

    pizzaPriceLabel(pizza) {
      const { quantity } = pizza;
      const price = this.pizzaPrice(pizza);

      return quantity > 1 ? `${quantity}x${price}` : price;
    },

    miscPriceLabel(id, quantity) {
      const miscPrice = this.getAttrItemEntity("misc", id, "price");

      return quantity > 1 ? `${quantity}x${miscPrice}` : miscPrice;
    },

    orderAddress({ addressId, orderAddress }) {
      const address = this.getAddressById(addressId);

      if (address) {
        return address.name;
      } else {
        const { street, building, flat } = orderAddress;

        return this.addressText(street, building, flat);
      }
    },

    handleRemove() {
      this.$emit("remove", this.order.id);
    },

    handleRepeat() {
      this.$emit("repeat", this.order);
    },
  },
};
</script>
