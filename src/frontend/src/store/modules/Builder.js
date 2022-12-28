import {
  CLEAR_STATE,
  SET_DOUGH,
  SET_INGREDIENTS,
  SET_SAUCE,
  SET_SIZE,
  SET_BUILDER,
  SET_INGREDIENT_COUNT,
  SET_BUILDER_NAME,
  SET_BUILDER_PRICE,
} from "@/store/mutations-types";

import pizza from "@/static/pizza.json";

const setupState = () => ({
  builder: {
    dough: pizza.dough[0],
    ingredients: [],
    sauce: pizza.sauces[0],
    size: pizza.sizes[0],
    name: "",
    price: 0,
  },
});

export default {
  namespaced: true,

  state: setupState(),

  getters: {
    builder(state) {
      return state.builder;
    },

    ingredientCount(state) {
      return state.builder.ingredients.some((el) => el.count > 0);
    },

    builderName(state) {
      return state.builder.name || "";
    },
  },

  actions: {},

  mutations: {
    [CLEAR_STATE](state) {
      Object.assign(state, setupState());
    },

    [SET_BUILDER](state, payload) {
      state.builder = payload;
    },

    [SET_DOUGH](state, payload) {
      state.builder.dough = payload;
    },

    [SET_INGREDIENTS](state, payload) {
      state.builder.ingredients = [...state.builder.ingredients, payload];
    },

    [SET_INGREDIENT_COUNT](state, { index, hasState, isDecrease }) {
      if (hasState && isDecrease) {
        state.builder.ingredients[index].count -= 1;

        if (state.builder.ingredients[index].count === 0) {
          state.builder.ingredients.splice(index, 1);
        }
      } else {
        if (state.builder.ingredients[index].count < 3) {
          state.builder.ingredients[index].count += 1;
        }
      }
    },

    [SET_SAUCE](state, payload) {
      state.builder.sauce = payload;
    },

    [SET_SIZE](state, payload) {
      state.builder.size = payload;
    },

    [SET_BUILDER_NAME](state, payload) {
      state.builder.name = payload;
    },

    [SET_BUILDER_PRICE](state, payload) {
      state.builder.price = payload;
    },
  },
};
