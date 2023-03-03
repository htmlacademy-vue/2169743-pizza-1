import { createLocalVue, mount } from "@vue/test-utils";

import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector";

const localVue = createLocalVue();

describe("BuilderSauceSelector", () => {
  const propsData = {
    items: [],
    selected: "",
  };

  const slots = {
    default: "content",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderSauceSelector, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("BuilderSauceSelector renders out the slot content", () => {
    createComponent({ localVue, propsData, slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
