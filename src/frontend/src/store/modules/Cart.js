import misc from "@/static/misc.json";

export default {
  namespaced: true,

  state: {
    misc: misc,
  },

  getters: {
    misc(state) {
      return state.misc;
    },
  },

  actions: {},

  mutations: {},
};
