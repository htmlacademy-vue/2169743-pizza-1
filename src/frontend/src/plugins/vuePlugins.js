import Vue from "vue";
import store from "@/store";
import Notifier from "@/plugins/notifier";
import JWTService from "@/services/jwt.service";
import { createResources } from "@/common/helpers";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $notifier: () => new Notifier(store),
        $jwt: () => JWTService,
        $api() {
          return createResources(this.$notifier);
        },
      },
    });
  },
};

Vue.use(plugins);
