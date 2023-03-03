import { createLocalVue, mount } from "@vue/test-utils";

import AppLayout from "@/layouts/AppLayout";
import AppHeader from "@/common/components/AppHeader";
import AppSidebar from "@/common/components/AppSidebar";

const localVue = createLocalVue();
localVue.cpmponent(AppHeader);
localVue.cpmponent(AppSidebar);

describe("UserLayout", () => {
  const slots = {
    default: "test content",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppLayout, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent({ localVue });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Renders header", () => {
    createComponent({ localVue });
    const header = wrapper.find("[data-test='header']");
    expect(header.exists()).toBeTruthy();
  });

  it("Renders sidebar", () => {
    createComponent({ localVue });
    const header = wrapper.find("[data-test='sidebar']");
    expect(header.exists()).toBeTruthy();
  });

  it("UserLayout renders out the slot content", () => {
    createComponent({ localVue, slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
