import { shallowMount } from "@vue/test-utils";

import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

import pizza from "@/static/pizza.json";

describe("BuilderPizzaView", () => {
  const propsData = {
    dough: pizza.dough[0],
    sauce: pizza.sauces[0],
    size: pizza.sizes[0],
    ingredients: [],
  };

  // TODO_CALL:
  const computed = {};

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderPizzaView, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("No ingredients result", () => {
    createComponent({ propsData });
    expect(123).toBe(123);
  });

  it("Some ingredients result", () => {
    createComponent({ propsData });
    expect(123).toBe(123);
  });
});
