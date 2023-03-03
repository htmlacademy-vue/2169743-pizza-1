import { shallowMount } from "@vue/test-utils";

import AppRadioButton from "@/common/components/AppRadioButton";

describe("AppRadioButton", () => {
  let propsData;

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppRadioButton, options);
  };

  beforeEach(() => {
    propsData = {
      name: "testName",
      value: "testValue",
      label: "testLabel",
      selected: "testLabel",
    };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Input name is prop name", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("name")).toBe(propsData.name);
  });

  it("It sets the initial value", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.value).toBe(propsData.value);
  });

  it("It emits an input event when change value", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    input.trigger("input");
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("Input checked is truthy", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("checked")).toBe(true);
  });

  it("Input checked is falsy", () => {
    propsData.selected = "testLabel2";

    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("checked")).toBe(false);
  });
});
