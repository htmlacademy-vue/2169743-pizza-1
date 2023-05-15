import { shallowMount } from "@vue/test-utils";

import AppSidebar from "@/common/components/AppSidebar";

describe("AppSidebar", () => {
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

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppSidebar, options);
  };

  afterEach(() => {
    wrapper?.destroy();
    mocks.$store.state.sidebarMenu = [];
  });

  it("Is rendered", () => {
    createComponent({ mocks, stubs });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("Links renders", async () => {
    mocks.$store.state.sidebarMenu = [
      { id: 1, route: "/profile", label: "testProfile" },
      { id: 2, route: "/orders", label: "testOrders" },
    ];

    createComponent({ mocks, stubs });
    let sidebar = wrapper.find("[data-test='sidebar']");

    mocks.$store.state.sidebarMenu.forEach((link) => {
      expect(sidebar.html()).toContain(link.route);
      expect(sidebar.html()).toContain(link.label);
    });
  });
});
