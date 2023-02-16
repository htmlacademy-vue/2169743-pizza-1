<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <router-link to="/" class="logo layout__logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
      <router-link to="/orders" class="layout__link layout__link--active">
        История заказов
      </router-link>
      <router-link to="/profile" class="layout__link">Мои данные</router-link>
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>

      <template v-if="orders.length">
        <OrderCard
          v-for="order in orders"
          :key="order.id"
          :order="order"
          @remove="removeHandler"
          @repeat="repeatHandler"
        />
      </template>
      <template v-else>
        <p>У вас нет прошлых заказов.</p>
      </template>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

import OrderCard from "@/modules/orders/components/OrderCard";

import calcPrice from "@/common/mixins/calcPrice.js";

export default {
  name: "Orders",

  mixins: [calcPrice],

  components: {
    OrderCard,
  },

  computed: {
    ...mapGetters(["getItemEntity", "getAttrItemEntity"]),
    ...mapGetters("Orders", ["orders"]),
  },

  mounted() {
    this.getOrders();
  },

  methods: {
    ...mapMutations("Cart", [
      "CLEAR_STATE",
      "SET_RECEIVE",
      "PUSH_ORDER",
      "PUSH_MISC",
    ]),
    ...mapActions("Orders", ["getOrders", "removeOrder"]),

    removeHandler(id) {
      this.removeOrder(id);
    },

    repeatHandler(order) {
      const { orderAddress, orderPizzas, orderMisc } = order;
      const receive = {};

      this.CLEAR_STATE();

      if (orderAddress) {
        receive.id = receive.value = orderAddress.id;
        receive.street = orderAddress.street;
        receive.building = orderAddress.building;
        receive.flat = orderAddress.flat;
        receive.comment = orderAddress.comment;
        receive.name = orderAddress.name;
      } else {
        receive.value = "customer";
      }

      if (orderPizzas?.length) {
        orderPizzas.forEach((pizza) => {
          const { id, doughId, name, quantity, sauceId, sizeId } = pizza;

          const dough = this.getItemEntity("dough", doughId);
          const sauce = this.getItemEntity("sauces", sauceId);
          const size = this.getItemEntity("sizes", sizeId);
          const ingredients = pizza.ingredients.map((el) => {
            const { id, name, price } = this.getItemEntity(
              "ingredients",
              el.ingredientId
            );

            return {
              id,
              name,
              price,
              quantity: el.quantity,
            };
          });

          const price = this.$calcPizzaPrice({
            dough,
            sauce,
            size,
            ingredients,
          });

          this.PUSH_ORDER({
            id,
            name,
            dough,
            sauce,
            size,
            ingredients,
            quantity,
            price,
          });
        });
      }

      if (orderMisc?.length) {
        orderMisc.forEach((misc) => {
          const miscPrice = this.getAttrItemEntity(
            "misc",
            misc.miscId,
            "price"
          );

          this.PUSH_MISC({
            id: misc.miscId,
            price: miscPrice,
            quantity: misc.quantity,
          });
        });
      }

      this.SET_RECEIVE(receive);

      this.$router.push("/cart");
    },
  },
};
</script>
