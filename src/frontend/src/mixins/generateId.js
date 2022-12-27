export default {
  methods: {
    $generateId(list) {
      let id = list.reduce((prev, next) => {
        return Math.max(prev, next.id);
      }, 0);

      return ++id;
    },
  },
};
