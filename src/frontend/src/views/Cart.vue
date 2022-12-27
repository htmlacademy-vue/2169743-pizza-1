<template>
  <form
    action="test.html"
    method="post"
    class="layout-form"
    @submit.prevent="handleSubmit"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <ul class="cart-list sheet" v-if="builderList.length">
          <CartProductSelector
            v-for="(order, index) in builderList"
            :key="index"
            class="cart-list__item"
            tag="li"
            :id="order.id"
            :order="order"
            :selected="builderList"
            @change="changeCountBuilder"
          />
        </ul>
        <div class="sheet cart__empty" v-else>
          <p>В корзине нет ни одного товара</p>
        </div>

        <div class="cart__additional" v-if="builderList.length">
          <ul class="additional-list">
            <CartAdditionalSelector
              class="additional-list__item sheet"
              v-for="item in misc"
              :key="item.id"
              tag="li"
              :id="item.id"
              :additional="item"
              :selected="miscList"
              @change="changeCountMisc"
            />
          </ul>
        </div>

        <div class="cart__form" v-if="builderList.length">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">{{ form.select.label }}</span>
              <select
                class="select"
                :name="form.select.name"
                :value="receive.value"
                @input="handleSelect($event)"
              >
                <option
                  v-for="(option, index) in selectOptions"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>{{ form.phone.label }}</span>
              <input
                :type="form.phone.type"
                :name="form.phone.name"
                :placeholder="form.phone.placeholder"
              />
            </label>

            <CartFormFieldAddress
              v-if="receive.value !== 'customer'"
              :label="form.address.label"
              :fields="form.address.fields"
            />
          </div>
        </div>
      </div>
    </main>
    <section class="footer" v-if="builderList.length">
      <div class="footer__more">
        <router-link to="/" class="button button--border button--arrow">
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ orderPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>

    <Popup v-if="isPopupOpen" @close="closePopup" />
  </form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import isAuth from "@/mixins/isAuth.js";

import Popup from "@/common/components/Popup";

import CartProductSelector from "@/modules/cart/components/CartProductSelector";
import CartAdditionalSelector from "@/modules/cart/components/CartAdditionalSelector";
import CartFormFieldAddress from "@/modules/cart/components/CartFormFieldAddress";

export default {
  name: "Cart",

  components: {
    Popup,
    CartProductSelector,
    CartAdditionalSelector,
    CartFormFieldAddress,
  },

  mixins: [isAuth],

  data() {
    return {
      isPopupOpen: false,

      form: {
        select: {
          label: "Получение заказа:",
          name: "test",
        },
        phone: {
          label: "Контактный телефон:",
          type: "text",
          name: "tel",
          placeholder: "+7 999-999-99-99",
        },
        address: {
          label: "Новый адрес:",
          fields: [
            {
              label: "Улица*",
              type: "text",
              name: "street",
            },
            {
              class: "small",
              label: "Дом*",
              type: "text",
              name: "house",
            },
            {
              class: "small",
              label: "Квартира",
              type: "text",
              name: "apartment",
            },
          ],
        },
      },
    };
  },

  computed: {
    ...mapGetters(["misc"]),
    ...mapGetters("Auth", ["address"]),
    ...mapGetters("Cart", ["receive"]),
    ...mapGetters("Orders", ["builderList", "miscList", "orderPrice"]),

    selectOptions() {
      let options = [
        {
          value: "customer",
          label: "Получу сам",
        },
        {
          value: "new address",
          label: "Новый адрес",
        },
      ];

      if (this.$isAuth) {
        options = options.concat(
          this.user.address.map((el, index) =>
            Object.assign(el, { value: index })
          )
        );
      }

      return options;
    },
  },

  methods: {
    ...mapMutations("Orders", [
      "PUSH_MISC",
      "SET_MISC_COUNT",
      "SET_ORDER_COUNT",
    ]),
    ...mapMutations("Cart", ["SET_RECEIVE", "SET_RECEIVE_VALUE"]),

    handleSubmit() {
      this.isPopupOpen = true;
    },

    handleSelect(e) {
      let value = e.target.value;

      if (Number.isInteger(+value)) {
        this.SET_RECEIVE(this.address[+value]);
      } else {
        this.SET_RECEIVE({ value });
      }
    },

    closePopup() {
      this.isPopupOpen = false;
    },

    changeCountBuilder(currentBuilder) {
      if (this.builderList.length) {
        const isMatch = this.builderList.some(
          (builder) => builder.id === currentBuilder.id
        );

        if (isMatch) {
          const index = this.builderList.findIndex(
            (builder) => builder.id === currentBuilder.id
          );

          this.builderList[index].countState = currentBuilder.countState;

          const hasState = currentBuilder.hasOwnProperty("countState");
          const isDecrease = this.builderList[index].countState === "decrease";

          this.SET_ORDER_COUNT({ index, hasState, isDecrease });
        }
      }
    },

    changeCountMisc(currentMisc) {
      if (this.miscList.length) {
        const isMatch = this.miscList.some(
          (misc) => misc.id === currentMisc.id
        );

        if (isMatch) {
          const index = this.miscList.findIndex(
            (misc) => misc.id === currentMisc.id
          );

          this.miscList[index].countState = currentMisc.countState;

          const hasState = currentMisc.hasOwnProperty("countState");
          const isDecrease = this.miscList[index].countState === "decrease";

          this.SET_MISC_COUNT({ index, hasState, isDecrease });
        } else {
          this.addMisc(currentMisc);
        }
      } else {
        this.addMisc(currentMisc);
      }
    },

    addMisc(misc) {
      if (!misc.hasOwnProperty("count")) {
        misc.count = 1;
      }

      this.PUSH_MISC(misc);
    },
  },
};
</script>

<style lang="scss" scoped></style>
