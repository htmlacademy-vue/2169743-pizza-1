import { shallowMount } from "@vue/test-utils";

import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";

describe("BuilderSizeSelector", () => {
  let propsData;
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    propsData = {
      label: "32 см",
      selected: "32 см",
    };
  });

  afterEach(() => {
    wrapper?.destroy();
  });

  it("Input checked is truthy", () => {
    createComponent({ propsData });

    expect(wrapper.find("input").element.checked).toBeTruthy();
  });

  it("Input checked is falsy", () => {
    propsData.selected = "testLabel2";

    createComponent({ propsData });

    expect(wrapper.find("input").element.checked).toBeFalsy();
  });

  it("It emits an input event when change value", async () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    await input.trigger("input");

    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("It sets the initial value", () => {
    createComponent({ propsData });

    expect(wrapper.find("input").element.value).toBe("normal");
  });

  it("Computed normal size", () => {
    const localThis = {
      label: "32 см",
    };

    expect(BuilderSizeSelector.computed.sizeValue.call(localThis)).toBe(
      "normal"
    );
    expect(
      BuilderSizeSelector.computed.sizeClass.call({
        ...localThis,
        sizeValue: "normal",
      })
    ).toBe("diameter__input--normal");
  });
});
