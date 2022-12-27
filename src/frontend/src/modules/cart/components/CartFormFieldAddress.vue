<template>
  <div class="cart-form__address">
    <span class="cart-form__label">{{ label }}</span>
    <div
      class="cart-form__input"
      v-for="(field, index) in computedFields"
      :key="index"
      :class="fieldClass(field.class)"
    >
      <label class="input">
        <span>{{ field.label }}</span>
        <input
          :type="field.type"
          :name="field.name"
          :value="!isNewAddress ? field.value : ''"
          :disabled="!isNewAddress"
        />
      </label>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartFormFieldAddress",

  props: {
    label: {
      type: String,
      default: "Новый адрес:",
    },

    fields: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters("Cart", ["receive"]),

    computedFields() {
      let fields = [...this.fields];
      const { apartment, house, street } = this.receive;

      if (apartment && house && street) {
        fields.forEach((field) => {
          field.value = this.receive[field.name];
        });
      }

      return fields;
    },

    isNewAddress() {
      return this.receive.value === "new address";
    },
  },

  methods: {
    fieldClass(modificator) {
      if (modificator) {
        return `cart-form__input--${modificator}`;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
