import { mount } from "@vue/test-utils";

import productCount from "@/common/mixins/productCount";

describe("Mixin - productCount", () => {
  it("Find quantity from selected array", () => {
    const Component = {
      render() {},
    };

    const wrapper = mount(Component, {
      mixins: [productCount],
      props: ["id", "selected"],
      propsData: {
        id: 4,
        selected: [
          { id: 1, quantity: 5 },
          { id: 4, quantity: 15 },
        ],
      },
    });

    expect(wrapper.vm.$countValue).toEqual(15);
  });
});
