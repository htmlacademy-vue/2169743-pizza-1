<template>
  <div
    class="pizza"
    :class="foundationClass"
    @dragover.prevent
    @drop.prevent="drop"
  >
    <div class="pizza__wrapper">
      <transition-group
        name="filling"
        appear
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <template v-for="{ quantity, value } in ingredients">
          <div
            v-for="time in quantity"
            :key="`${value} - ${time}`"
            class="pizza__filling"
            :class="fillingClass(value, time)"
          />
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script>
import DOUGH from "@/common/enums/dough";
import SAUCE from "@/common/enums/sauce";

export default {
  name: "BuilderPizzaView",

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

  computed: {
    doughValue() {
      return this.dough?.id === DOUGH.small ? "small" : "big";
    },

    sauceValue() {
      return this.sauce?.id === SAUCE.tomato ? "tomato" : "creamy";
    },

    foundationClass() {
      return `pizza--foundation--${this.doughValue}-${this.sauceValue}`;
    },
  },

  methods: {
    fillingClass(name, time) {
      let fillingClass = `pizza__filling--${name}`;

      switch (time) {
        case 2:
          fillingClass += " pizza__filling--second";
          break;
        case 3:
          fillingClass += " pizza__filling--third";
          break;
      }

      return fillingClass;
    },

    drop(e) {
      const dataItem = e.dataTransfer.getData("ingredientData");
      this.$emit("drop", dataItem);
    },
  },
};
</script>
