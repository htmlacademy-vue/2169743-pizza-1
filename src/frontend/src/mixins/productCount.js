export default {
  props: {
    id: {
      type: Number,
      required: true,
    },

    selected: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    countValue() {
      let value = 0;

      if (this.selected.length) {
        this.selected.forEach((item) => {
          if (item.id === this.id) {
            value = item.count;
          }
        });
      }

      return value;
    },
  },
};
