import { createLocalVue, mount } from "@vue/test-utils";

import AppLayout from "@/layouts/AppLayout";
import AppHeader from "@/common/components/AppHeader";

const localVue = createLocalVue();
localVue.component(AppHeader);

describe("AppLayout", () => {
  const slots = {
    default: "test content",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppLayout, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent({ localVue });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Renders header", () => {
    createComponent({ localVue });
    const header = wrapper.find("[data-test='header']");
    expect(header.exists()).toBeTruthy();
  });

  it("AppLayout renders out the slot content", () => {
    createComponent({ localVue, slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
