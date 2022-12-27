import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";

import pizza from "@/static/pizza.json";
import misc from "@/static/misc.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pizza: {
      doughes: pizza.dough,
      ingredients: pizza.ingredients,
      sauces: pizza.sauces,
      sizes: pizza.sizes,
    },
    misc,
  },

  getters: {
    pizza(state) {
      return state.pizza;
    },

    misc(state) {
      return state.misc;
    },
  },

  actions: {},

  mutations: {},

  modules: {
    ...modules,
  },
});
