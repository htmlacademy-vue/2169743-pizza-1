import { createLocalVue, mount } from "@vue/test-utils";

import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import AppItemCounter from "@/common/components/AppItemCounter";

const localVue = createLocalVue();
localVue.component("AppItemCounter", AppItemCounter);

describe("BuilderIngredientsSelector", () => {
  const propsData = {
    tag: "div",
    label: "testLabel",
    selected: [],
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  afterEach(() => {
    wrapper?.destroy();
  });

  it("Computed ingredient value & class", () => {
    const localVue = {
      label: "Бекон",
    };

    expect(
      BuilderIngredientsSelector.computed.ingredientValue.call(localVue)
    ).toBe("bacon");
    expect(
      BuilderIngredientsSelector.computed.ingredientClass.call({
        ...localVue,
        ingredientValue: "bacon",
      })
    ).toBe("filling--bacon");
  });

  it("Is rendered", () => {
    createComponent({ localVue, propsData });

    expect(wrapper.exists()).toBeTruthy();
  });
});
