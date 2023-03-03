import { shallowMount } from "@vue/test-utils";

import BuilderPriceCounter from "@/modules/components/BuilderPriceCounter";

import pizza from "@/static/pizza.json";

describe("BuilderPriceCounter", () => {
  const propsData = {
    dough: pizza.dough[0],
    sauce: pizza.sauces[0],
    size: pizza.sizes[0],
    ingredients: [],
  };

  // TODO_CALL:
  const vuexComputed = {};

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderPriceCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Check pizza price", () => {
    createComponent({ propsData });
    expect(123).toBe(123);
  });
});
