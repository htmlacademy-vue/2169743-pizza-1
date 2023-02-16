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

const setupState = () => ({
  builder: {
    dough: null,
    ingredients: [],
    sauce: null,
    size: null,
    name: "",
    price: 0,
  },
});

const state = () => setupState();

const getters = {
  builder(state, getters, rootState) {
    return {
      ...state.builder,
      dough: state.builder.dough ?? rootState.dough[0],
      sauce: state.builder.sauce ?? rootState.sauces[0],
      size: state.builder.size ?? rootState.sizes[0],
    };
  },

  ingredientCount(state) {
    return state.builder.ingredients.some((el) => el.quantity > 0);
  },

  builderName(state, getters) {
    return getters.builder.name || "";
  },
};

const mutations = {
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
      state.builder.ingredients[index].quantity -= 1;

      if (state.builder.ingredients[index].quantity === 0) {
        state.builder.ingredients.splice(index, 1);
      }
    } else {
      if (state.builder.ingredients[index].quantity < 3) {
        state.builder.ingredients[index].quantity += 1;
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
