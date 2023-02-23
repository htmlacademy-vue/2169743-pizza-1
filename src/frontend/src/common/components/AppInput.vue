<template>
  <component :is="tag" class="input">
    <span>{{ label }}</span>
    <input
      ref="input"
      v-bind="$attrs"
      :value="value"
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
    },

    value: {
      type: [String, Number],
      default: "",
    },
  },
};
</script>
