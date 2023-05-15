import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import AppHeader from "@/common/components/AppHeader";

import { generateMockStore } from "@/store/mocks";
import { authenticateUser } from "@/common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppHeader", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    },
    $notifier: {
      success: jest.fn(),
    },
  };

  const stubs = ["router-link"];

  let actions;
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppHeader, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        logout: jest.fn(),
      },
    };
    mocks.$notifier.success = jest.fn();
    mocks.$router.push = jest.fn();
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper?.destroy();
  });

  it("Is rendered", () => {
    createComponent({ localVue, store, mocks, stubs });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("Renders header auth actions", () => {
    authenticateUser(store);

    createComponent({ localVue, store, mocks, stubs });
    const headerActions = wrapper.find("[data-test='auth-action']");

    expect(headerActions.exists()).toBeTruthy();
  });

  it("Doesn't Render header auth actions", () => {
    createComponent({ localVue, store, mocks, stubs });
    const headerActions = wrapper.find("[data-test='auth-action']");

    expect(headerActions.exists()).toBeFalsy();
  });

  it("Calls logout on logout button click", async () => {
    authenticateUser(store);

    createComponent({ localVue, mocks, store, stubs });
    const logoutBtn = wrapper.find("[data-test='logout-btn']");
    await logoutBtn.trigger("click");

    expect(actions.Auth.logout).toHaveBeenCalled();
    expect(mocks.$notifier.success).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("/login");
  });
});

// Протестировать
/*
  + <template v-if="isAuthenticated">
  + <template v-else>
  + :alt="getUserAttribute('name')"
  + <a @click.prevent="$logout"
  + <router-link to="/login"
*/

// Данные из тест-хранилища
/*
  ...mapState("Auth", ["isAuthenticated"]),
*/
