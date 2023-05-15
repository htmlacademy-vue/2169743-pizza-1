import { shallowMount } from "@vue/test-utils";

import AppInput from "@/common/components/AppInput";

describe("AppInput", () => {
  const hiddenClass = "visually-hidden";

  let propsData;

  const attrs = {
    type: "text",
    name: "testName",
    placeholder: "testPlaceholder",
    required: true,
    value: "testValue",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppInput, options);
  };

  beforeEach(() => {
    propsData = {
      label: "testLabel",
      hiddenLabel: true,
    };
  });

  afterEach(() => {
    wrapper?.destroy();
  });

  it("It sets the initial model value", () => {
    createComponent({ attrs, propsData });

    expect(wrapper.find("input").element.value).toBe(attrs.value);
  });

  it("It emits an input event when typing", async () => {
    createComponent({ attrs, propsData });
    let input = wrapper.find("input");
    await input.trigger("input");

    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("Emits the current input value when typing", async () => {
    const TEST_VALUE = "testInputValue";

    createComponent({ attrs, propsData });
    let input = wrapper.find("input");
    input.element.value = TEST_VALUE;
    await input.trigger("input");

    expect(wrapper.emitted().input[0][0]).toEqual(TEST_VALUE);
  });

  it("Tag is label", () => {
    propsData.tag = "label";

    createComponent({ attrs, propsData });

    expect(wrapper.element.tagName).toBe("LABEL");
  });

  it("Default tag", () => {
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

    expect(input.attributes("required")).toBe("required");
  });

  it("Input disabled is attr disabled", () => {
    attrs.disabled = true;

    createComponent({ attrs, propsData });
    let input = wrapper.find("input");

    expect(input.attributes("disabled")).toBe("disabled");
  });

  it("Has hidden class for label", () => {
    createComponent({ attrs, propsData });
    let spanLabel = wrapper.find("span");

    expect(spanLabel.attributes("class")).toContain(hiddenClass);
  });
});
