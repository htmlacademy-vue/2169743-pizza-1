import { shallowMount } from "@vue/test-utils";

import AppProduct from "@/common/components/AppProduct";

// ? Здесь не понимаю, что можно тестировать, кроме отрисовки компонента
describe("AppProduct", () => {
  let propsData;

  let wrapper;

  const createComponent = (options) => {
    shallowMount(AppProduct, options);
  };

  beforeEach(() => {
    propsData = {
      productName: "testName",
      sizeId: 1,
      doughId: 1,
      sauceId: 1,
      ingredients: [],
    };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent({ propsData });
    expect(wrapper.exists()).toBeTruthy();
  });
});
