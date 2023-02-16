import { SET_ENTITY } from "@/store/mutations-types";

const state = () => ({
  isAuthenticated: false,
  user: null,
  addresses: [],
});

const getters = {
  getUserAttribute: (state) => (attr) => state.user ? state.user[attr] : "",

  addresses(state) {
    return state.addresses;
  },

  getAddressById: (state) => (id) =>
    state.addresses.find((address) => address.id === id),
};

const actions = {
  async login({ dispatch }, credentials) {
    const data = await this.$api.auth.login(credentials);

    this.$jwt.saveToken(data.token);
    this.$api.auth.setAuthHeader();

    dispatch("getMe");
  },

  async logout({ commit }, sendRequest = true) {
    if (sendRequest) {
      await this.$api.auth.logout();
    }

    this.$jwt.destroyToken();
    this.$api.auth.setAuthHeader();

    commit(
      SET_ENTITY,
      { module: "Auth", entity: "isAuthenticated", value: false },
      { root: true }
    );

    commit(
      SET_ENTITY,
      { module: "Auth", entity: "user", value: null },
      { root: true }
    );
  },

  async getMe({ commit, dispatch }) {
    try {
      const data = await this.$api.auth.getMe();

      commit(
        SET_ENTITY,
        { module: "Auth", entity: "isAuthenticated", value: true },
        { root: true }
      );

      commit(
        SET_ENTITY,
        { module: "Auth", entity: "user", value: data },
        { root: true }
      );

      dispatch("getAddresses");
    } catch {
      dispatch("logout", false);
    }
  },

  async getAddresses({ commit }) {
    try {
      const data = await this.$api.addresses.query();

      commit(
        SET_ENTITY,
        { module: "Auth", entity: "addresses", value: data },
        { root: true }
      );
    } catch (error) {
      this.$notifier.error(error);
    }
  },

  async createAddress({ dispatch }, entity) {
    try {
      if (entity) {
        await this.$api.addresses.post(entity);
        dispatch("getAddresses");
      }
    } catch (error) {
      this.$notifier.error(error);
    }
  },

  async updateAddress({ dispatch }, entity) {
    try {
      if (entity) {
        await this.$api.addresses.put(entity);
        dispatch("getAddresses");
      }
    } catch (error) {
      this.$notifier.error(error);
    }
  },

  async removeAddress({ dispatch }, id) {
    try {
      if (id) {
        await this.$api.addresses.delete(id);
        dispatch("getAddresses");
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
