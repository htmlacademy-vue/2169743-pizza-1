import { createLocalVue, mount } from "@vue/test-utils";

import AppSelectorItem from "@/common/components/AppSelectorItem";

import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppSelectorItem", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppSelectorItem, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent({ localVue });
    expect(wrapper.exists()).toBeTruthy();
  });
});

// Протестировать
/*
  TODO_CALL: что тестировать ?
*/
