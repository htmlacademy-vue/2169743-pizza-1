import { shallowMount } from "@vue/test-utils";

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";

describe("BuilderDoughSelector", () => {
  let propsData;
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderDoughSelector, options);
  };

  beforeEach(() => {
    propsData = {
      label: "Тонкое",
      description: "testDescription",
      selected: "Тонкое",
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

  it("Computed light dough", () => {
    const localThis = {
      label: "Тонкое",
      description: "test description",
      selected: "Тонкое",
    };

    expect(BuilderDoughSelector.computed.isLightDough.call(localThis)).toBe(
      true
    );
    expect(
      BuilderDoughSelector.computed.doughType.call({
        ...localThis,
        isLightDough: true,
      })
    ).toBe("light");
    expect(
      BuilderDoughSelector.computed.doughValue.call({
        ...localThis,
        isLightDough: true,
      })
    ).toBe("small");
    expect(
      BuilderDoughSelector.computed.doughClass.call({
        ...localThis,
        doughType: "light",
      })
    ).toBe("dough__input--light");
  });

  it("It sets the initial value", () => {
    createComponent({ propsData });

    expect(wrapper.find("input").element.value).toBe("light");
  });
});
