import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("Auth", ["user"]),

    $isAuth() {
      return !!this.user.id;
    },
  },
};
