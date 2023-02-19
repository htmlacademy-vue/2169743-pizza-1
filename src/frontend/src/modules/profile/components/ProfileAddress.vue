<template>
  <div class="layout__address">
    <component
      :is="cardComponent"
      :address="address"
      @changeData="editMode"
      @saveData="handleUpdate"
      @remove="handleRemove"
    />
  </div>
</template>

<script>
import ProfileAddressView from "@/modules/profile/components/ProfileAddressView";
import ProfileAddressEdit from "@/modules/profile/components/ProfileAddressEdit";

export default {
  name: "ProfileAddress",

  components: {
    ProfileAddressView,
    ProfileAddressEdit,
  },

  props: {
    address: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      isEdit: false,
    };
  },

  computed: {
    cardComponent() {
      return this.isEdit ? ProfileAddressEdit : ProfileAddressView;
    },
  },

  methods: {
    editMode() {
      this.isEdit = true;
    },

    handleUpdate(address) {
      this.isEdit = false;
      this.$emit("update", address);
    },

    handleRemove() {
      this.$emit("remove", this.address?.id);
    },
  },
};
</script>
