import { createLocalVue, mount } from "@vue/test-utils";

import Vuex from "vuex";

import Index from "@/views/Index";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Index", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(Index, options);
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
  + @submit.prevent="handleSubmit">
*/
