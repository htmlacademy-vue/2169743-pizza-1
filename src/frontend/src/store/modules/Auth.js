import { CLEAR_STATE } from "@/store/mutations-types";
import user from "@/static/user.json";

const setupState = () => ({
  user: {
    ...user,
    address: [
      {
        label: "Дом 1",
        street: "ул. Зеленая",
        house: "15",
        apartment: "12",
      },
      {
        label: "Дом 2",
        street: "ул. Желтая",
        house: "22",
        apartment: "102",
      },
      {
        label: "Дом 3",
        street: "ул. Красная",
        house: "2",
        apartment: "10",
      },
    ],
  },
});

export default {
  namespaced: true,

  state: setupState(),

  getters: {
    user(state) {
      return state.user;
    },

    address(state) {
      return state.user.address;
    },
  },

  actions: {},

  mutations: {
    [CLEAR_STATE](state) {
      Object.assign(state, setupState());
    },
  },
};
