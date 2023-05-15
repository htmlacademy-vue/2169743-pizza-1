import { shallowMount } from "@vue/test-utils";

import calcPriceMixin from "@/common/mixins/calcPrice";

describe("Mixin - calcPrice", () => {
  it("It counted", () => {
    const pizza = {
      dough: {
        price: 100,
      },
      sauce: {
        price: 100,
      },
      size: {
        multiplier: 1,
      },
      ingredients: [
        { price: 10, quantity: 1 },
        { price: 5, quantity: 3 },
        { price: 10, quantity: 2 },
      ],
    };

    const Component = {
      render() {},
    };

    const wrapper = shallowMount(Component, {
      mixins: [calcPriceMixin],
    });

    expect(wrapper.vm.$calcPizzaPrice(pizza)).toEqual(245);
  });
});
