import {
  CLEAR_STATE,
  PUSH_ORDER,
  PUSH_MISC,
  SET_MISC_COUNT,
  SET_ORDER_COUNT,
} from "@/store/mutations-types";

const setupState = () => ({
  builderList: [],
  miscList: [],
});

export default {
  namespaced: true,

  state: setupState(),

  getters: {
    builderList(state) {
      return state.builderList;
    },

    miscList(state) {
      return state.miscList;
    },

    orderPrice(state) {
      const buildersPrice = state.builderList.reduce((total, builder) => {
        return total + builder.price * builder.count;
      }, 0);
      const miscPrice = state.miscList.reduce((total, misc) => {
        return total + misc.price * misc.count;
      }, 0);

      return buildersPrice + miscPrice;
    },
  },

  actions: {},

  mutations: {
    [CLEAR_STATE](state) {
      Object.assign(state, setupState());
    },

    [PUSH_ORDER](state, payload) {
      const isMatch = state.builderList.some(
        (order) => order.id === payload.id
      );

      if (isMatch) {
        const index = state.builderList.findIndex(
          (order) => order.id === payload.id
        );

        state.builderList.splice(index, 1, payload);
      } else {
        state.builderList = [...state.builderList, payload];
      }
    },

    [PUSH_MISC](state, payload) {
      state.miscList = [...state.miscList, payload];
    },

    [SET_MISC_COUNT](state, { index, hasState, isDecrease }) {
      if (hasState && isDecrease) {
        state.miscList[index].count -= 1;

        if (state.miscList[index].count === 0) {
          state.miscList.splice(index, 1);
        }
      } else {
        state.miscList[index].count += 1;
      }
    },

    [SET_ORDER_COUNT](state, { index, hasState, isDecrease }) {
      if (hasState && isDecrease) {
        state.builderList[index].count -= 1;

        if (state.builderList[index].count === 0) {
          state.builderList.splice(index, 1);
        }
      } else {
        state.builderList[index].count += 1;
      }
    },
  },
};
