<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="sign-form__input">
        <AppInput
          ref="email"
          tag="label"
          v-model="email"
          label="E-mail"
          type="email"
          name="email"
          placeholder="example@mail.ru"
        />
      </div>

      <div class="sign-form__input">
        <AppInput
          ref="password"
          tag="label"
          v-model="password"
          label="Пароль"
          type="password"
          name="pass"
          placeholder="***********"
        />
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import validator from "@/common/mixins/validator";

export default {
  name: "Login",

  mixins: [validator],

  data() {
    return {
      email: "",
      password: "",
      validations: {
        email: {
          error: "",
          rules: ["required", "email"],
        },
        password: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },

  mounted() {
    this.$refs.email?.$refs.input.focus();
  },

  methods: {
    ...mapActions("Auth", ["login"]),

    async handleSubmit() {
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        this.$showErrors();

        return;
      }

      await this.login({
        email: this.email,
        password: this.password,
      });

      await this.$router.push("/");
    },
  },
};
</script>
