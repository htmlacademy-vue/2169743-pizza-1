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

  userAvatar:
    (state, getters) =>
    (scales = [], isWebp = false, highQuality = false) => {
      const imagePath = getters.getUserAttribute("avatar");
      const indexDot = imagePath.lastIndexOf(".");
      const imageFormat = isWebp ? ".webp" : imagePath.slice(indexDot);
      const filePath = imagePath.slice(0, indexDot);
      let result = "";

      if (isWebp && scales.length) {
        scales.forEach((scale) => {
          if (scale === 1 && !highQuality) {
            result += `${filePath}${imageFormat} ${scale}x, `;
          } else {
            result += `${filePath}@${scale}x${imageFormat} ${
              highQuality ? scale / 2 : ""
            }x, `;
          }
        });

        result = result.slice(0, result.length - 2);
      } else if (scales.length) {
        scales.forEach((scale) => {
          result += `${filePath}@${scale}x${imageFormat},`;
        });

        result = result.slice(0, result.length - 1);
      } else {
        result = imagePath;
      }

      return result;
    },

  addressText: () => (street, building, flat) => {
    const address = [street, `д. ${building}`];

    flat && address.push(`кв. ${flat}`);

    return address.join(", ");
  },
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
