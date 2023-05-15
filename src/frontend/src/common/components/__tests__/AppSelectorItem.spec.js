import { createLocalVue, mount } from "@vue/test-utils";

import Vuex from "vuex";

import AppSelectorItem from "@/common/components/AppSelectorItem";
import AppInput from "@/common/components/AppInput";

import { generateMockStore } from "@/store/mocks";
import { createPizza } from "@/common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("AppInput", AppInput);

describe("AppSelectorItem", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(AppSelectorItem, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createPizza(store);
  });

  afterEach(() => {
    wrapper?.destroy();
  });

  it("Is rendered", () => {
    createComponent({ localVue, store });

    expect(wrapper.exists()).toBeTruthy();
  });
});
