import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import AppProduct from "@/common/components/AppProduct";

import { generateMockStore } from "@/store/mocks";
import { createPizza } from "@/common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppProduct", () => {
  let propsData = {
    productName: "testName",
    sizeId: 1,
    doughId: 1,
    sauceId: 1,
    ingredients: [
      {
        ingredientId: 1,
        quantity: 1,
      },
      {
        ingredientId: 2,
        quantity: 1,
      },
    ],
  };

  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppProduct, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createPizza(store);
  });

  afterEach(() => {
    wrapper?.destroy();
  });

  it("Is rendered", () => {
    createComponent({ localVue, store, propsData });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("Product has name", () => {
    createComponent({ localVue, store, propsData });

    expect(wrapper.html()).toContain(propsData.productName);
  });

  it("Correct dough description", () => {
    const DOUGH_TEXT = "23 см, на тонком тексте";

    createComponent({ localVue, store, propsData });

    expect(wrapper.html()).toContain(DOUGH_TEXT);
  });

  it("Correct sauce description", () => {
    const SAUCE_TEXT = "Соус: томатный";

    createComponent({ localVue, store, propsData });

    expect(wrapper.html()).toContain(SAUCE_TEXT);
  });

  it("Correct ingredients description", () => {
    const INGREDIENTS_TEXT = "Начинка: грибы, чеддер";

    createComponent({ localVue, store, propsData });

    expect(wrapper.html()).toContain(INGREDIENTS_TEXT);
  });
});

// Протестировать
/*
  + {{ productName }}
  + {{ doughText(sizeId, doughId) }}
  + {{ sauceText(sauceId) }}
  + {{ ingredientsText(ingredients) }}
*/

// Данные из тест-хранилища
/*
  ...mapGetters(["doughText", "sauceText", "ingredientsText"]),
*/
