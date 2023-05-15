<template>
  <component :is="tag" class="input">
    <span :class="labelClass">{{ label }}</span>
    <input
      ref="input"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
    />
  </component>
</template>

<script>
export default {
  name: "AppInput",

  inheritAttrs: false,

  props: {
    tag: {
      type: String,
      default: "div",
    },

    label: {
      type: String,
      required: true,
      validator(value) {
        return !!value.trim();
      },
    },

    hiddenLabel: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    labelClass() {
      return {
        "visually-hidden": this.hiddenLabel,
      };
    },
  },
};
</script>
