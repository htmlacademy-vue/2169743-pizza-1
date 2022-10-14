<template>
  <div class="page">
    <AppLayout>
      <main class="content">
        <form action="#" method="post">
          <div class="content__wrapper">
            <h1 class="title title--big">Конструктор пиццы</h1>

            <div class="content__dough">
              <div class="sheet">
                <h2 class="title title--small sheet__title">Выберите тесто</h2>

                <div class="sheet__content dough">
                  <BuilderDoughSelector
                    v-for="dough in doughes"
                    :key="dough.id"
                    :label="dough.name"
                    :description="dough.description"
                    :selected="pizzaBuilder.dough.name"
                    @input="selectDough"
                  />
                </div>
              </div>
            </div>

            <div class="content__diameter">
              <div class="sheet">
                <h2 class="title title--small sheet__title">Выберите размер</h2>

                <div class="sheet__content diameter">
                  <BuilderSizeSelector
                    v-for="size in sizes"
                    :key="size.id"
                    :label="size.name"
                    :selected="pizzaBuilder.size.diametr"
                    @input="selectSize"
                  />
                </div>
              </div>
            </div>

            <div class="content__ingredients">
              <div class="sheet">
                <h2 class="title title--small sheet__title">
                  Выберите ингредиенты
                </h2>

                <div class="sheet__content ingredients">
                  <BuilderSauceSelector
                    :items="sauces"
                    :selected="pizzaBuilder.sauce.name"
                    @select="selectSauce"
                  >
                    <p>Основной соус:</p>
                  </BuilderSauceSelector>

                  <div class="ingredients__filling">
                    <p>Начинка:</p>

                    <ul class="ingredients__list">
                      <BuilderIngredientsSelector
                        v-for="ingredient in ingredients"
                        :key="ingredient.id"
                        class="ingredients__item"
                        tag="li"
                        :label="ingredient.name"
                        :selected="pizzaBuilder.ingredients"
                        :draggable="true"
                        @change="selectIngredients"
                      />
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <SelectorItem
              :dough="pizzaBuilder.dough"
              :sauce="pizzaBuilder.sauce"
              :size="pizzaBuilder.size"
              :ingredients="pizzaBuilder.ingredients"
              class="content__pizza"
              @selectDrop="dropHandler"
            />
          </div>
        </form>
      </main>
    </AppLayout>
  </div>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";

import AppLayout from "@/layouts/AppLayout";

import SelectorItem from "@/common/components/SelectorItem";

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";

export default {
  name: "IndexHome",

  components: {
    AppLayout,
    SelectorItem,
    BuilderDoughSelector,
    BuilderSauceSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
  },

  data() {
    return {
      misc,
      user,
      doughes: pizza.dough,
      ingredients: pizza.ingredients,
      sauces: pizza.sauces,
      sizes: pizza.sizes,

      pizzaBuilder: {
        dough: {
          name: "Тонкое",
          type: "light",
          value: "small",
          price: 300,
        },
        sauce: {
          name: "Томатный",
          value: "tomato",
          price: 50,
        },
        size: {
          diametr: "23 см",
          multi: 1,
        },
        ingredients: [],
      },
    };
  },

  methods: {
    selectDough(dough) {
      this.pizzaBuilder.dough.name = dough.name;
      this.pizzaBuilder.dough.type = dough.type;
      this.pizzaBuilder.dough.value = dough.value;

      this.doughes.forEach((el) => {
        if (el.name === dough.name) {
          this.pizzaBuilder.dough.price = el.price;
        }
      });
    },

    selectSize(label) {
      this.pizzaBuilder.size.diametr = label;

      this.sizes.forEach((size) => {
        if (label === size.name) {
          this.pizzaBuilder.size.multi = size.multiplier;
        }
      });
    },

    selectSauce(sauce) {
      this.pizzaBuilder.sauce.name = sauce.name;
      this.pizzaBuilder.sauce.value = sauce.value;

      this.sauces.forEach((el) => {
        if (el.name === sauce.name) {
          this.pizzaBuilder.sauce.price = el.price;
        }
      });
    },

    selectIngredients(obj) {
      const currentFill = { ...obj };

      this.ingredients.forEach((el) => {
        if (el.name === currentFill.name) {
          currentFill.price = el.price;
        }
      });

      if (this.pizzaBuilder.ingredients.length) {
        const isMatch = this.pizzaBuilder.ingredients.some(
          (fill) => fill.name === currentFill.name
        );

        if (isMatch) {
          const index = this.pizzaBuilder.ingredients.findIndex(
            (fill) => fill.name === currentFill.name
          );

          this.pizzaBuilder.ingredients[index].countState =
            currentFill.countState;

          const hasState = currentFill.hasOwnProperty("countState");
          const isDecrease =
            this.pizzaBuilder.ingredients[index].countState === "decrease";

          if (hasState && isDecrease) {
            this.pizzaBuilder.ingredients[index].count -= 1;
          } else {
            if (this.pizzaBuilder.ingredients[index].count < 3) {
              this.pizzaBuilder.ingredients[index].count += 1;
            }
          }
        } else {
          this.addIngredient(currentFill);
        }
      } else {
        this.addIngredient(currentFill);
      }
    },

    addIngredient(ingredient) {
      if (!ingredient.hasOwnProperty("count")) {
        ingredient.count = 1;
      }

      this.pizzaBuilder.ingredients.push(ingredient);
    },

    dropHandler(data) {
      this.selectIngredients(JSON.parse(data));
    },
  },
};
</script>
