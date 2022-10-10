<template>
  <div
    class="pizza"
    :class="foundationClass"
    @dragover.prevent
    @drop.prevent="drop"
  >
    <div class="pizza__wrapper">
      <template v-if="ingredients.length">
        <template v-for="filling in ingredients">
          <div
            v-for="time in filling.count"
            :key="`${filling.value} - ${time}`"
            :class="fillingClass(filling.value, time)"
            class="pizza__filling"
          />
        </template>
      </template>
      <template v-else>
        <div class="pizza__filling"></div>
      </template>
    </div>
  </div>
</template>

<script>
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
    foundationClass() {
      return `pizza--foundation--${this.dough.value}-${this.sauce.value}`;
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
        default:
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
