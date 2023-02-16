<template>
  <div class="sheet address-form">
    <div class="address-form__header">
      <b v-if="address.name">
        {{ address.name }}
      </b>

      <div class="address-form__edit">
        <button type="button" class="icon" @click="changeData">
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>

    <p>{{ computedAddress }}</p>

    <small v-if="address.comment">
      {{ address.comment }}
    </small>
  </div>
</template>

<script>
export default {
  name: "ProfileAddressView",

  props: {
    address: {
      type: Object,
      required: true,
    },
  },

  computed: {
    computedAddress() {
      const { street, building, flat } = this.address;
      return `${street}, д. ${building}, кв. ${flat}`;
    },
  },

  methods: {
    changeData() {
      this.$emit("changeData", this.address.id);
    },
  },
};
</script>
