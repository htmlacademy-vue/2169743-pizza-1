import { shallowMount } from "@vue/test-utils";

import AppLayout from "@/layouts/AppLayout";

describe("DefaultLayout", () => {
  const slots = {
    default: "test content",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayout, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent({ slots });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("DefaultLayout renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
