import { shallowMount } from "@vue/test-utils";

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";

describe("BuilderDoughSelector", () => {
  let propsData;

  // ? а если у нас computed свойства
  let computedValue;

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderDoughSelector, options);
  };

  beforeEach(() => {
    propsData = {
      label: "testLabel",
      description: "testDescription",
      selected: "testLabel",
    };

    computedValue = {
      doughType: "light",
      doughValue: "small",
    };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It sets the initial model value", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.value).toBe(computedValue.doughValue);
  });

  it("Input checked is truthy", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("checked")).toBe(true);
  });

  it("Input checked is truthy", () => {
    propsData.selected = "testLabel2";

    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("checked")).toBe(false);
  });
});
