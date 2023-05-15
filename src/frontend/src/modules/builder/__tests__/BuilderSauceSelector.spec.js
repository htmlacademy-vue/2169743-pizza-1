import { createLocalVue, mount } from "@vue/test-utils";

import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector";
import AppRadioButton from "@/common/components/AppRadioButton";

import { sauces } from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.component("AppRadioButton", AppRadioButton);

describe("BuilderSauceSelector", () => {
  const propsData = {
    items: [...sauces],
    selected: "Томатный",
  };

  const slots = {
    default: "content",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderSauceSelector, options);
  };

  afterEach(() => {
    wrapper?.destroy();
  });

  it("Is rendered", () => {
    createComponent({ localVue, propsData, slots });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("BuilderSauceSelector renders out the slot content", () => {
    createComponent({ localVue, propsData, slots });

    expect(wrapper.html()).toContain(slots.default);
  });
});
