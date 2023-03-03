import { createLocalVue, mount } from "@vue/test-utils";

import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";

const localVue = createLocalVue();

describe("BuilderIngredientsSelector", () => {
  const propsData = {
    tag: "div",
    label: "testLabel",
    selected: [],
  };

  // TODO_CALL:
  const computed = {
    ingredientValue: () => "???",
    countValue: () => "???",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });
});
