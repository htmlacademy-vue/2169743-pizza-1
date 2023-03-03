import { shallowMount } from "@vue/test-utils";

import AppInput from "@/common/components/AppInput";

describe("AppInput", () => {
  const propsData = {
    tag: "div",
    label: "testLabel",
    value: "testValue",
  };
  const attrs = {
    type: "text",
    name: "testName",
    placeholder: "testPlaceholder",
    required: true,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppInput, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("It sets the initial model value", () => {
    createComponent({ attrs, propsData });
    expect(wrapper.find("input").element.value).toBe(propsData.value);
  });

  it("It emits an input event when typing", () => {
    createComponent({ attrs, propsData });
    let input = wrapper.find("input");
    input.trigger("input");
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("Emits the current input value when typing", () => {
    // ? Можно ли вот так выносить тестовое значение
    const TEST_VALUE = "testInputValue";

    createComponent({ attrs, propsData });
    let input = wrapper.find("input");
    input.element.value = TEST_VALUE;
    input.trigger("input");

    expect(wrapper.emitted().input[0][0]).toEqual(TEST_VALUE);
  });

  it("Is correct tag", () => {
    createComponent({ attrs, propsData });
    expect(wrapper.element.tagName).toBe("DIV");
  });

  it("Input type is attr type", () => {
    createComponent({ attrs, propsData });
    let input = wrapper.find("input");
    expect(input.attributes("type")).toBe(attrs.type);
  });

  it("Input name is attr name", () => {
    createComponent({ attrs, propsData });
    let input = wrapper.find("input");
    expect(input.attributes("name")).toBe(attrs.name);
  });

  it("Input placeholder is attr placeholder", () => {
    createComponent({ attrs, propsData });
    let input = wrapper.find("input");
    expect(input.attributes("placeholder")).toBe(attrs.placeholder);
  });

  it("Input required is attr required", () => {
    createComponent({ attrs, propsData });
    let input = wrapper.find("input");
    expect(input.attributes("required")).toBe(true);
  });
});
