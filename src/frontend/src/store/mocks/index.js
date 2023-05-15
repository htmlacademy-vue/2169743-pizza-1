import { cloneDeep } from "lodash";

import Vuex from "vuex";
import { getters, mutations } from "@/store";
import modules from "@/store/modules";
import VuexPlugins from "@/plugins/vuexPlugins";

import SIDEBAR_MENU from "@/common/enums/sidebarMenu";

const setupState = () => ({
  notifications: [],
  sidebarMenu: SIDEBAR_MENU,
});

export const generateMockStore = (actions) => {
  const modulesCopy = cloneDeep(modules);

  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }

  return new Vuex.Store({
    state: setupState(),
    getters,
    mutations,
    modules: modulesCopy,
    plugins: [VuexPlugins],
  });
};
