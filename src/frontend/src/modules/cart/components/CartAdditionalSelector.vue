<template>
  <component :is="tag">
    <p class="additional-list__description">
      <img
        :src="additional.image"
        width="39"
        height="60"
        :alt="additional.name"
      />
      <span>{{ additional.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <ItemCounter
        class="additional-list__counter"
        :value="$countValue"
        color="orange"
        @change="changeCount"
      />

      <div class="additional-list__price">
        <b>× {{ additional.price }} ₽</b>
      </div>
    </div>
  </component>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";

import productCount from "@/mixins/productCount.js";

export default {
  name: "CartAdditionalSelector",

  components: {
    ItemCounter,
  },

  mixins: [productCount],

  props: {
    tag: {
      type: String,
      default: "div",
    },

    additional: {
      type: Object,
      required: true,
    },
  },

  methods: {
    changeCount(state) {
      const misc = {};
      misc.id = this.id;
      misc.price = this.additional.price;
      misc.countState = state;

      this.$emit("change", misc);
    },
  },
};
</script>
