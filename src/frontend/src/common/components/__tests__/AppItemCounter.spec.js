import { shallowMount } from "@vue/test-utils";

import AppItemCounter from "@/common/components/AppItemCounter";

describe("AppItemCounter", () => {
  const propsData = {
    value: 5,
    min: 1,
    max: 10,
    color: "orange",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppItemCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
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

  it("Minus button is active",  () => {
    createComponent({ propsData });
    let buttonMinus = wrapper.find("[data-test='buttonMinus']");
    expect(buttonMinus.attributes("disabled")).toBe(false);
  });

  it("Minus button is disabled, value equal min", () => {
    propsData.value = 1;
    createComponent({ propsData });
    let buttonMinus = wrapper.find("[data-test='buttonMinus']");
    expect(buttonMinus.attributes("disabled")).toBe(true);
  });

  it("Minus button is disabled, value less min", () => {
    propsData.value = 0;
    createComponent({ propsData });
    let buttonMinus = wrapper.find("[data-test='buttonMinus']");
    expect(buttonMinus.attributes("disabled")).toBe(true);
  });

  it("Plus button is active", () => {
    createComponent({ propsData });
    let buttonPlus = wrapper.find("[data-test='buttonPlus']");
    expect(buttonPlus.attributes("disabled")).toBe(false);
  });

  it("Plus button is disabled, value equal max", () => {
    propsData.value = 10;
    createComponent({ propsData });
    let buttonPlus = wrapper.find("[data-test='buttonPlus']");
    expect(buttonPlus.attributes("disabled")).toBe(true);
  });

  it("Plus button is disabled, value more max", () => {
    propsData.value = 11;
    createComponent({ propsData });
    let buttonPlus = wrapper.find("[data-test='buttonPlus']");
    expect(buttonPlus.attributes("disabled")).toBe(true);
  });
});
