import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";

import pizza from "@/static/pizza.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pizza: {
      doughes: pizza.dough,
      ingredients: pizza.ingredients,
      sauces: pizza.sauces,
      sizes: pizza.sizes,
    },
  },

  getters: {
    pizza(state) {
      return state.pizza;
    },
  },

  actions: {},

  mutations: {},

  modules: {
    ...modules,
  },
});
