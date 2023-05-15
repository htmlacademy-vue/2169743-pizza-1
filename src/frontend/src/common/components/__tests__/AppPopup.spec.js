import { shallowMount } from "@vue/test-utils";

import AppPopup from "@/common/components/AppPopup";

describe("AppPopup", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppPopup, options);
  };

  afterEach(() => {
    wrapper?.destroy();
  });

  it("It Emits click event on CloseButton", async () => {
    createComponent();
    let buttonClose = wrapper.find("[data-test='buttonClose']");
    await buttonClose.trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("It Emits click event on CompleteButton", async () => {
    createComponent();
    let buttonComplete = wrapper.find("[data-test='buttonComplete']");
    await buttonComplete.trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
