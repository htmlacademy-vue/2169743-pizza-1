export default {
  methods: {
    $calcPizzaPrice(pizza) {
      const { dough, sauce, size, ingredients } = pizza;

      const ingredientsPrice = ingredients?.reduce((total, ingredient) => {
        return total + ingredient.price * ingredient.quantity;
      }, 0);

      return (dough.price + sauce.price + ingredientsPrice) * size.multiplier;
    },
  },
};
