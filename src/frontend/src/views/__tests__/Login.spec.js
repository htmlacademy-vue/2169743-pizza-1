import { createLocalVue, mount } from "@vue/test-utils";

import Vuex from "vuex";

import Login from "@/views/Login";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Login", () => {
  const stubs = ["router-link"];

  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent({ localVue });
    expect(wrapper.exists()).toBeTruthy();
  });
});

// Протестировать
/*
  <router-link to="/"
  <form @submit.prevent="handleSubmit">
*/
