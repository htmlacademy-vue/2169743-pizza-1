<template>
  <div class="selector-item">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        required
        autocomplete="off"
        v-model="builder.name"
      />
    </label>

    <div class="content__constructor">
      <BuilderPizzaView
        :dough="builder.dough"
        :sauce="builder.sauce"
        :size="builder.size"
        :ingredients="builder.ingredients"
        @drop="selectDrop"
      />
    </div>

    <BuilderPriceCounter
      :dough="builder.dough"
      :sauce="builder.sauce"
      :size="builder.size"
      :ingredients="builder.ingredients"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "SelectorItem",

  components: {
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  computed: {
    ...mapGetters("Builder", ["builder", "ingredientCount"]),
  },

  methods: {
    ...mapMutations("Builder", ["SET_BUILDER_NAME"]),

    selectDrop(data) {
      this.$emit("selectDrop", data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
