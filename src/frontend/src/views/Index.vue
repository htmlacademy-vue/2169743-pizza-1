<template>
  <div class="constructor">
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <div class="sheet__content dough">
                <label
                  v-for="dough in doughes"
                  :key="dough.id"
                  :class="doughClass(dough.name)"
                  class="dough__input"
                >
                  <input
                    type="radio"
                    name="dought"
                    :value="doughValue(dough.name)"
                    class="visually-hidden"
                    checked
                  />
                  <b>{{ dough.name }}</b>
                  <span>{{ dough.description }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label
                  v-for="size in sizes"
                  :key="size.id"
                  :class="sizeClass(size.name)"
                  class="diameter__input"
                >
                  <input
                    type="radio"
                    name="diameter"
                    :value="sizeValue(size.name)"
                    class="visually-hidden"
                  />
                  <span>{{ size.name }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингредиенты
              </h2>

              <div class="sheet__content ingredients">
                <div class="ingredients__sauce">
                  <p>Основной соус:</p>

                  <label
                    v-for="(sauce, index) in sauces"
                    :key="sauce.id"
                    class="radio ingredients__input"
                  >
                    <input
                      type="radio"
                      name="sauce"
                      :value="sauceValue(sauce.name)"
                      :checked="index === 0"
                    />
                    <span>{{ sauce.name }}</span>
                  </label>
                </div>

                <div class="ingredients__filling">
                  <p>Начинка:</p>

                  <ul class="ingredients__list">
                    <li
                      v-for="ingredient in ingredients"
                      :key="ingredient.id"
                      class="ingredients__item"
                    >
                      <span
                        class="filling"
                        :class="ingredientClass(ingredient.name)"
                      >
                        {{ ingredient.name }}
                      </span>

                      <div class="counter counter--orange ingredients__counter">
                        <button
                          type="button"
                          class="counter__button counter__button--minus"
                          disabled
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          type="text"
                          name="counter"
                          class="counter__input"
                          value="0"
                        />
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button" disabled>Готовьте!</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";

export default {
  name: "constructor",

  data() {
    return {
      misc,
      user,
      doughes: pizza.dough,
      ingredients: pizza.ingredients,
      sauces: pizza.sauces,
      sizes: pizza.sizes,
    };
  },

  methods: {
    doughClass(name) {
      const modificator = name === "Тонкое" ? "light" : "large";
      return `dough__input--${modificator}`;
    },

    doughValue(name) {
      return name === "Тонкое" ? "light" : "large";
    },

    sizeClass(name) {
      let modificator = "";

      switch (name) {
        case "32 см":
          modificator = "normal";
          break;
        case "45 см":
          modificator = "big";
          break;
        default:
          modificator = "small";
          break;
      }

      return `diameter__input--${modificator}`;
    },

    sizeValue(name) {
      let value = "";

      switch (name) {
        case "32 см":
          value = "normal";
          break;
        case "45 см":
          value = "big";
          break;
        default:
          value = "small";
          break;
      }

      return value;
    },

    sauceValue(label) {
      let value = "";

      switch (label) {
        case "Сливочный":
          value = "creamy";
          break;
        default:
          value = "tomato";
          break;
      }

      return value;
    },

    ingredientClass(name) {
      let modificator = "";

      switch (name) {
        case "Ананас":
          modificator = "ananas";
          break;
        case "Бекон":
          modificator = "bacon";
          break;
        case "Блю чиз":
          modificator = "blue_cheese";
          break;
        case "Чеддер":
          modificator = "cheddar";
          break;
        case "Чили":
          modificator = "chile";
          break;
        case "Ветчина":
          modificator = "ham";
          break;
        case "Халапеньо":
          modificator = "jalapeno";
          break;
        case "Моцарелла":
          modificator = "mozzarella";
          break;
        case "Грибы":
          modificator = "mushrooms";
          break;
        case "Маслины":
          modificator = "olives";
          break;
        case "Лук":
          modificator = "onion";
          break;
        case "Пармезан":
          modificator = "parmesan";
          break;
        case "Салями":
          modificator = "salami";
          break;
        case "Лосось":
          modificator = "salmon";
          break;
        default:
          modificator = "tomatoes";
          break;
      }

      return `filling--${modificator}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
