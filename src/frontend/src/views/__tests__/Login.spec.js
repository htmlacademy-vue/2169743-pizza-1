import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import Login from "@/views/Login";
import AppInput from "@/common/components/AppInput";

import $validator from "@/common/mixins/validator";

import { generateMockStore } from "@/store/mocks";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("AppInput", AppInput);

describe("Login", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    },
    $notifier: {
      error: jest.fn(),
    },
    $validator,
  };

  const stubs = ["router-link"];

  let actions;
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        login: jest.fn(),
      },
    };
    mocks.$router.push = jest.fn();
    mocks.$notifier.error = jest.fn();
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper?.destroy();
  });

  it("Is rendered", () => {
    createComponent({ localVue, store, mocks, stubs });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("Validation mixin has been called on form submit", async () => {
    createComponent({ localVue, store, mocks, stubs });
    const spyValidateFields = jest.spyOn(wrapper.vm, "$validateFields");
    const spyShowErrors = jest.spyOn(wrapper.vm, "$showErrors");
    await wrapper.find("form").trigger("submit");

    expect(spyValidateFields).toHaveBeenCalled();
    expect(spyShowErrors).toHaveBeenCalled();
    expect(mocks.$notifier.error).toHaveBeenCalled();
    expect(actions.Auth.login).not.toHaveBeenCalled();
  });

  it("Calls login and redirects to index if credentials are valid", async () => {
    createComponent({ localVue, store, mocks, stubs });
    const fieldEmail = wrapper.find("[data-test='email']");
    const fieldPass = wrapper.find("[data-test='password']");
    fieldEmail.element.value = "user@example.com";
    await fieldEmail.trigger("input");
    fieldPass.element.value = "user@example.com";
    await fieldPass.trigger("input");
    await wrapper.find("form").trigger("submit");

    expect(actions.Auth.login).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });
});

// Протестировать
/*
  <form @submit.prevent="handleSubmit">
*/
