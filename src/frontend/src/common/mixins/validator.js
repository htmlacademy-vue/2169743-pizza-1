import { EMAIL_REGEX, URL_REGEX, NUMBER_REGEX } from "@/common/constants";

const rules = {
  isNotEmpty: {
    rule: (value) => !!value?.trim(),
    message: "Поле не заполнено",
  },
  required: {
    rule: (value) => !!value?.trim(),
    message: "Поле обязательно для заполнения",
  },
  email: {
    rule: (value) => {
      return value ? EMAIL_REGEX.test(String(value).toLowerCase()) : true;
    },
    message: "Электронная почта имеет неверный формат",
  },
  url: {
    rule: (value) => (value ? URL_REGEX.test(value) : true),
    message: "Ссылка имеет неверный формат",
  },
  number: {
    rule: (value) => NUMBER_REGEX.test(Number(value)),
    message: "Значение не является числом",
  },
};

const validator = (value, appliedRules) => {
  let error = "";

  appliedRules.forEach((appliedRule) => {
    if (!rules[appliedRule]) return;

    const { rule, message } = rules[appliedRule];

    if (!rule(value)) {
      error = message;
    }
  });

  return error;
};

export default {
  methods: {
    $validateFields(fields, validations) {
      let isValid = true;

      Object.keys(validations).forEach((key) => {
        validations[key].error = validator(fields[key], validations[key].rules);

        if (validations[key].error) {
          isValid = false;
        }
      });

      return isValid;
    },

    $clearValidationErrors() {
      if (!this.validations) {
        return;
      }

      Object.keys(this.validations).forEach((key) => {
        this.$set(this.validations[key], "error", "");
      });
    },

    $showErrors() {
      for (const key in this.validations) {
        const { error } = this.validations[key];
        error && this.$notifier.error(error);
      }
    },
  },
};
