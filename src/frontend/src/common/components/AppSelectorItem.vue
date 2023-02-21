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
        :value="builderName"
        @input="handleInput($event)"
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
  name: "AppSelectorItem",

  components: {
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  computed: {
    ...mapGetters("Builder", ["builder", "ingredientCount", "builderName"]),
  },

  methods: {
    ...mapMutations("Builder", ["SET_BUILDER_NAME"]),

    selectDrop(data) {
      this.$emit("selectDrop", data);
    },

    handleInput(e) {
      this.SET_BUILDER_NAME(e.target.value);
    },
  },
};
</script>
