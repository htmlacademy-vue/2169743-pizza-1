import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import AppLayout from "@/layouts/AppLayout";

import { generateMockStore } from "@/store/mocks";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppLayout", () => {
  const slots = {
    default: "test content",
  };

  const stubs = ["router-link"];

  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppLayout, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper?.destroy();
  });

  it("Is rendered", () => {
    createComponent({ localVue, slots, store, stubs });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("AppLayout renders out the slot content", () => {
    createComponent({ localVue, slots, store, stubs });

    expect(wrapper.html()).toContain(slots.default);
  });
});
