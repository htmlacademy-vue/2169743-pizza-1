<template>
  <div class="selector-item">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        required
      />
    </label>

    <div class="content__constructor">
      <BuilderPizzaView
        :dough="dough"
        :sauce="sauce"
        :size="size"
        :ingredients="ingredients"
        @drop="selectDrop"
      />
    </div>

    <BuilderPriceCounter
      :dough="dough"
      :sauce="sauce"
      :size="size"
      :ingredients="ingredients"
    />
  </div>
</template>

<script>
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "SelectorItem",

  components: {
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  props: {
    dough: {
      type: Object,
      required: true,
    },

    sauce: {
      type: Object,
      required: true,
    },

    size: {
      type: Object,
      required: true,
    },

    ingredients: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    selectDrop(data) {
      this.$emit("selectDrop", data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
