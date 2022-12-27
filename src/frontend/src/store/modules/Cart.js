import { SET_RECEIVE, CLEAR_STATE } from "@/store/mutations-types";

const setupState = () => ({
  receive: {
    value: "customer",
  },
});

export default {
  namespaced: true,

  state: setupState(),

  getters: {
    receive(state) {
      return state.receive;
    },
  },

  actions: {},

  mutations: {
    [CLEAR_STATE](state) {
      Object.assign(state, setupState());
    },

    [SET_RECEIVE](state, payload) {
      state.receive = payload;
    },
  },
};
