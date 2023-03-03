import { shallowMount } from "@vue/test-utils";

import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";

describe("BuilderSizeSelector", () => {
  const propsData = {
    label: "testLabel",
    selected: "testLabel",
  };

  const computed = {};

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderSizeSelector, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("test", () => {
    createComponent({ propsData });
    expect(123).toBe(123);
  });
});
