import { shallowMount } from "@vue/test-utils";

import AppItemCounter from "@/common/components/AppItemCounter";

describe("AppItemCounter", () => {
  let propsData;

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppItemCounter, options);
  };

  beforeEach(() => {
    propsData = {
      value: 5,
      min: 1,
      max: 10,
      color: "orange",
    };
  });

  afterEach(() => {
    wrapper?.destroy();
  });

  it("Emit button minus change event", async () => {
    createComponent({ propsData });
    let buttonMinus = wrapper.find("[data-test='buttonMinus']");
    await buttonMinus.trigger("click");

    expect(wrapper.emitted().change).toBeTruthy();
  });

  it("Emit button plus change event", async () => {
    createComponent({ propsData });
    let buttonPlus = wrapper.find("[data-test='buttonPlus']");
    await buttonPlus.trigger("click");

    expect(wrapper.emitted().change).toBeTruthy();
  });

  it("It sets the initial value", () => {
    createComponent({ propsData });

    expect(wrapper.find("input").element.value).toBe(`${propsData.value}`);
  });

  it("Minus button is disabled, value equal min", () => {
    propsData.value = 1;

    createComponent({ propsData });
    let buttonMinus = wrapper.find("[data-test='buttonMinus']");

    expect(buttonMinus.attributes("disabled")).toBe("disabled");
  });

  it("Minus button is disabled, value less min", () => {
    propsData.value = 0;

    createComponent({ propsData });
    let buttonMinus = wrapper.find("[data-test='buttonMinus']");

    expect(buttonMinus.attributes("disabled")).toBe("disabled");
  });

  it("Plus button is disabled, value equal max", () => {
    propsData.value = 10;

    createComponent({ propsData });
    let buttonPlus = wrapper.find("[data-test='buttonPlus']");

    expect(buttonPlus.attributes("disabled")).toBe("disabled");
  });

  it("Plus button is disabled, value more max", () => {
    propsData.value = 11;

    createComponent({ propsData });
    let buttonPlus = wrapper.find("[data-test='buttonPlus']");

    expect(buttonPlus.attributes("disabled")).toBe("disabled");
  });
});
