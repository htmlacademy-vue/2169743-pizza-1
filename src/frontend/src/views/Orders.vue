<template>
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
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

import OrderCard from "@/modules/orders/components/OrderCard";

import calcPrice from "@/common/mixins/calcPrice";

export default {
  name: "Orders",

  components: {
    OrderCard,
  },

  mixins: [calcPrice],

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

    repeatHandler({ orderAddress, orderPizzas, orderMisc }) {
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
        orderMisc.forEach(({ miscId, quantity }) => {
          const miscPrice = this.getAttrItemEntity("misc", miscId, "price");

          this.PUSH_MISC({
            id: miscId,
            price: miscPrice,
            quantity,
          });
        });
      }

      this.SET_RECEIVE(receive);

      this.$router.push("/cart");
    },
  },
};
</script>
