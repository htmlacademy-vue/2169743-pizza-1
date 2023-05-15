import { shallowMount } from "@vue/test-utils";

import generateId from "@/common/mixins/generateId";

describe("Mixin - generateId", () => {
  it("Find big ID value and return bigger by 1", () => {
    const list = [{ id: 14 }, { id: 2 }];

    const Component = {
      render() {},
    };

    const wrapper = shallowMount(Component, {
      mixins: [generateId],
    });

    expect(wrapper.vm.$generateId(list)).toEqual(15);
  });
});
