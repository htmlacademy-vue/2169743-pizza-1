<template>
  <div class="page">
    <main class="content">
      <form action="#" method="post" @submit.prevent="handleSubmit">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <div class="sheet__content dough">
                <BuilderDoughSelector
                  v-for="dough in pizza.doughes"
                  :key="dough.id"
                  :label="dough.name"
                  :description="dough.description"
                  :selected="builder.dough.name"
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
                  v-for="size in pizza.sizes"
                  :key="size.id"
                  :label="size.name"
                  :selected="builder.size.diametr"
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
                  :items="pizza.sauces"
                  :selected="builder.sauce.name"
                  @select="selectSauce"
                >
                  <p>Основной соус:</p>
                </BuilderSauceSelector>

                <div class="ingredients__filling">
                  <p>Начинка:</p>

                  <ul class="ingredients__list">
                    <BuilderIngredientsSelector
                      v-for="ingredient in pizza.ingredients"
                      :key="ingredient.id"
                      class="ingredients__item"
                      tag="li"
                      :label="ingredient.name"
                      :selected="builder.ingredients"
                      :draggable="true"
                      @change="selectIngredients"
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <SelectorItem class="content__pizza" @selectDrop="handleDrop" />
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import SelectorItem from "@/common/components/SelectorItem";

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";

import generateId from "@/mixins/generateId.js";

export default {
  name: "IndexHome",

  components: {
    SelectorItem,
    BuilderDoughSelector,
    BuilderSauceSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
  },

  mixins: [generateId],

  computed: {
    ...mapGetters(["pizza"]),
    ...mapGetters("Builder", ["builder"]),
    ...mapGetters("Orders", ["builderList"]),
  },

  methods: {
    ...mapMutations("Builder", [
      "CLEAR_STATE",
      "SET_BUILDER",
      "SET_DOUGH",
      "SET_SIZE",
      "SET_SAUCE",
      "SET_INGREDIENTS",
      "SET_INGREDIENT_COUNT",
    ]),
    ...mapMutations("Orders", ["PUSH_ORDER"]),

    selectDough(dough) {
      const tempDough = {
        name: dough.name,
        type: dough.type,
        value: dough.value,
        price: null,
      };

      this.pizza.doughes.forEach((el) => {
        if (el.name === dough.name) {
          tempDough.price = el.price;
        }
      });

      this.SET_DOUGH(tempDough);
    },

    selectSize(label) {
      const tempSize = {
        diametr: label,
        multi: null,
      };

      this.pizza.sizes.forEach((size) => {
        if (label === size.name) {
          tempSize.multi = size.multiplier;
        }
      });

      this.SET_SIZE(tempSize);
    },

    selectSauce(sauce) {
      const tempSauce = {
        name: sauce.name,
        value: sauce.value,
        price: null,
      };

      this.pizza.sauces.forEach((el) => {
        if (el.name === sauce.name) {
          tempSauce.price = el.price;
        }
      });

      this.SET_SAUCE(tempSauce);
    },

    selectIngredients(currentFill) {
      this.pizza.ingredients.forEach((el) => {
        if (el.name === currentFill.name) {
          currentFill.price = el.price;
        }
      });

      const { ingredients } = this.builder;

      if (ingredients.length) {
        const isMatch = ingredients.some(
          (fill) => fill.name === currentFill.name
        );

        if (isMatch) {
          const index = ingredients.findIndex(
            (fill) => fill.name === currentFill.name
          );

          ingredients[index].countState = currentFill.countState;

          const hasState = currentFill.hasOwnProperty("countState");
          const isDecrease = ingredients[index].countState === "decrease";

          this.SET_INGREDIENT_COUNT({ index, hasState, isDecrease });
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

      this.SET_INGREDIENTS(ingredient);
    },

    handleDrop(data) {
      this.selectIngredients(JSON.parse(data));
    },

    handleSubmit() {
      const tmpBuilder = { ...this.builder };
      const id = this.generateId(this.builderList);

      if (!tmpBuilder.hasOwnProperty("id")) {
        tmpBuilder.id = id;
      }

      if (!tmpBuilder.hasOwnProperty("count")) {
        tmpBuilder.count = 1;
      }

      this.PUSH_ORDER({
        ...tmpBuilder,
      });
      this.CLEAR_STATE();
      this.$router.push("/cart");
    },
  },
};
</script>
