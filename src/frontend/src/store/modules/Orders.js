import { SET_ENTITY } from "@/store/mutations-types";

import { capitalize } from "@/common/helpers";

const entity = "orders";
const module = capitalize(entity);
const namespace = { entity, module };

const state = () => ({
  orders: [],
});

const getters = {
  orders(state) {
    return state.orders;
  },
};

const actions = {
  async getOrders({ commit }) {
    try {
      const data = await this.$api.orders.query();

      commit(SET_ENTITY, { ...namespace, value: data }, { root: true });
    } catch (error) {
      this.$notifier.error(error);
    }
  },

  async createOrder({ dispatch }, entity) {
    try {
      if (entity) {
        await this.$api.orders.post(entity);
        dispatch("getOrders");
      }
    } catch (error) {
      this.$notifier.error(error);
    }
  },

  async removeOrder({ dispatch }, id) {
    try {
      if (id) {
        await this.$api.orders.delete(id);
        dispatch("getOrders");
      }
    } catch (error) {
      this.$notifier.error(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
};
