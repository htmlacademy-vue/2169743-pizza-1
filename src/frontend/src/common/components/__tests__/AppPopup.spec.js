import { shallowMount } from "@vue/test-utils";

import AppPopup from "@/common/components/AppPopup";

describe("AppPopup", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppPopup, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("It Emits click event", () => {
    createComponent();
    let buttonClose = wrapper.find("[data-test='buttonClose']");
    buttonClose.trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("It Emits click event", () => {
    createComponent();
    let buttonComplete = wrapper.find("[data-test='buttonComplete']");
    buttonComplete.trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
