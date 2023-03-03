<template>
  <div class="selector-item">
    <AppInput
      :name="appSelectorItem.field.name"
      :placeholder="appSelectorItem.field.placeholder"
      :required="appSelectorItem.field.required"
      :autocomplete="appSelectorItem.field.autocomplete"
      :tag="appSelectorItem.field.tag"
      :label="appSelectorItem.field.label"
      :hiddenLabel="appSelectorItem.field.hiddenLabel"
      :value="builderName"
      @input="handleInput"
    />

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

import { appSelectorItem } from "@/common/enums/inputConfig";

export default {
  name: "AppSelectorItem",

  components: {
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  data() {
    return {
      appSelectorItem,
    };
  },

  computed: {
    ...mapGetters("Builder", ["builder", "ingredientCount", "builderName"]),
  },

  methods: {
    ...mapMutations("Builder", ["SET_BUILDER_NAME"]),

    selectDrop(data) {
      this.$emit("selectDrop", data);
    },

    handleInput(value) {
      if (typeof value === "string") {
        this.SET_BUILDER_NAME(value);
      }
    },
  },
};
</script>
