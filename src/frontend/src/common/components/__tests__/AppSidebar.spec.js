import { shallowMount } from "@vue/test-utils";

import AppSidebar from "@/common/components/AppSidebar";

const mocks = {
  $store: {
    state: {
      sidebarMenu: [],
    },
  },
  $router: {
    push: jest.fn(),
  },
};

const stubs = ["router-link"];

describe("AppSidebar", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppSidebar, options);
  };

  afterEach(() => {
    wrapper.destroy();
    mocks.$store.state.sidebarMenu = [];
  });

  it("Is rendered", () => {
    createComponent({ mocks, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  // ? не до конца понятно, а если у нас несколько элементов. Или тут достаточно одного
  it("Redirects to own route on click", async () => {
    mocks.$store.state.sidebarMenu = [
      { id: 5, route: "/profile", label: "testProfile" },
    ];
    createComponent({ mocks, stubs });
    let link = wrapper.find("[data-test='sidebar-links']");
    await link.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalled("/profile");
  });
});
