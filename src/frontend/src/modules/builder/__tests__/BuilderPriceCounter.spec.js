import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";

import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

import { generateMockStore } from "@/store/mocks";
import pizza from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPriceCounter", () => {
  const propsData = {
    dough: pizza.dough[0],
    sauce: pizza.sauces[0],
    size: pizza.sizes[0],
    ingredients: [],
  };

  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper?.destroy();
  });

  it("Render pizza price text", () => {
    createComponent({ localVue, store, propsData });

    expect(wrapper.html()).toContain("350");
  });

  it("Submit button is disable", () => {
    createComponent({ localVue, store, propsData });
    let btn = wrapper.find("[data-test='btn-submit']");

    expect(btn.attributes("disabled")).toBe("disabled");
  });
});
