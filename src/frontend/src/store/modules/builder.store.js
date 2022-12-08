import {
  SET_NAME_PIZZA,
  UPDATE_INGREDIENTS,
  UPDATE_ORDER,
  RESET_BUILDER_STATE,
  CHANGE_ORDER,
  CHANGE_INGREDIENTS,
  GET_PIZZA_PARTS,
  GET_PIZZA_DOUGHS,
  GET_PIZZA_SAUCE,
  GET_PIZZA_SIZE,
  GET_PIZZA_INGREDIENTS,
  CLEAR_NAME_PIZZA,
  REPEAT_ORDER,
} from "@/store/mutation-types";

const initialState = () => ({
  doughs: [],
  sizes: [],
  sauces: [],
  ingredients: [],
  order: {
    dough: 2,
    size: 1,
    sauce: 2,
    ingredients: [],
    price: 0,
    pizzaName: "",
    count: 1,
  },
});

export default {
  namespaced: true,
  state: initialState(),
  getters: {
    doughs(state) {
      return state.doughs;
    },
    sauces(state) {
      return state.sauces;
    },
    sizes(state) {
      return state.sizes;
    },
    ingredients(state) {
      return state.ingredients;
    },
    currentDough(state) {
      return state.order.dough;
    },
    currentDoughClass(state) {
      return state.order.dough === 1 ? "small" : "big";
    },
    currentSauce(state) {
      return state.order.sauce;
    },
    currentSauceClass(state) {
      return state.order.sauce === 1 ? "tomato" : "creamy";
    },
    currentSize(state) {
      return state.order.size;
    },
    currentIngredients(state) {
      return state.order.ingredients;
    },
    currentName(state) {
      return state.order.pizzaName;
    },
    doughPrice(state) {
      if (state.order.dough) {
        const doughPrice = state.doughs.filter(
          (item) => item.id === state.order.dough
        );
        return doughPrice[0]?.price;
      }

      return 0;
    },
    saucePrice(state) {
      if (state.order.sauce) {
        const saucePrice = state.sauces.filter(
          (item) => item.id === state.order.sauce
        );
        return saucePrice[0]?.price;
      }

      return 0;
    },
    ingredientPrice(state) {
      if (state.order.ingredients.length > 0) {
        let ingredientsPrices = 0;

        ingredientsPrices = state.order.ingredients
          .map((item) => item.count * item.price)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );
        return ingredientsPrices;
      }

      return 0;
    },
    sizeMultiplier(state) {
      if (state.order.size) {
        const sizeMultiplier = state.sizes.filter(
          (item) => item.id === state.order.size
        );
        return sizeMultiplier[0]?.multiplier;
      }

      return 0;
    },
    totalPrice(state, getters) {
      return (
        getters.sizeMultiplier *
        (getters.doughPrice + getters.saucePrice + getters.ingredientPrice)
      );
    },
    isDisabledButton(state) {
      return (
        state.order.pizzaName === "" || state.order.ingredients.length === 0
      );
    },
  },
  mutations: {
    [SET_NAME_PIZZA](state, pizzaName) {
      state.order.pizzaName = pizzaName;
    },
    [CLEAR_NAME_PIZZA](state) {
      state.order.pizzaName = "";
    },
    [UPDATE_ORDER](state, newValues) {
      newValues.filter((newValue) => {
        if (newValue.name === "dough") {
          state.order.dough = newValue.value;
        }
        if (newValue.name === "sauce") {
          state.order.sauce = newValue.value;
        }
        if (newValue.name === "diameter") {
          state.order.size = newValue.value;
        }
      });
    },
    [UPDATE_INGREDIENTS](state, name) {
      state.ingredients.forEach((item) => {
        if (item.id === name.id) {
          item.count = name.count;
        }
      });
      state.order.ingredients = state.ingredients.filter(
        (item) => item.count > 0
      );
    },
    [RESET_BUILDER_STATE](state) {
      Object.assign(state, initialState());
    },
    [CHANGE_ORDER](state, order) {
      state.order.dough = order.dough;
      state.order.size = order.size;
      state.order.sauce = order.sauce;
      state.order.ingredients = order.ingredients.slice(0);
      state.order.price = order.totalPrice;
      state.order.pizzaName = order.name;
      state.order.count = order.count;
    },
    [REPEAT_ORDER](state, order) {
      state.order.dough = order.dough;
      state.order.size = order.size;
      state.order.sauce = order.sauce;
      state.order.ingredients = order.ingredients.slice(0);
      state.order.pizzaName = order.name;
      state.order.count = order.count;
    },
    [CHANGE_INGREDIENTS](state, order) {
      order.ingredients.forEach((orderIngredient) => {
        state.ingredients.forEach((item) => {
          if (orderIngredient.value === item.value) {
            item.count = orderIngredient.count;
          }
        });
      });
    },
    [GET_PIZZA_DOUGHS](state, doughs) {
      state.doughs = doughs;
    },
    [GET_PIZZA_SAUCE](state, sauces) {
      state.sauces = sauces;
    },
    [GET_PIZZA_SIZE](state, sizes) {
      state.sizes = sizes;
    },
    [GET_PIZZA_INGREDIENTS](state, ingredients) {
      state.ingredients = ingredients;
    },
  },
  actions: {
    [SET_NAME_PIZZA]({ commit }, name) {
      commit(SET_NAME_PIZZA, name);
    },
    [UPDATE_ORDER]({ commit }, newValue) {
      commit(UPDATE_ORDER, newValue);
    },
    [UPDATE_INGREDIENTS]({ commit }, newValue) {
      commit(UPDATE_INGREDIENTS, newValue);
    },
    [CHANGE_ORDER]({ commit }, order) {
      commit(CHANGE_ORDER, order);
      commit(CHANGE_INGREDIENTS, order);
    },
    [REPEAT_ORDER]({ commit }, order) {
      commit(REPEAT_ORDER, order);
    },
    [RESET_BUILDER_STATE]({ commit }) {
      commit(RESET_BUILDER_STATE, { root: true });
    },
    async [GET_PIZZA_PARTS]({ commit }) {
      const dough = await this.$api.builder.fetchDough();
      const sauces = await this.$api.builder.fetchSauces();
      const sizes = await this.$api.builder.fetchSizes();
      const ingredients = await this.$api.builder.fetchIngredients();
      commit(CLEAR_NAME_PIZZA);
      commit(GET_PIZZA_DOUGHS, dough);
      commit(GET_PIZZA_SIZE, sizes);
      commit(GET_PIZZA_SAUCE, sauces);
      commit(GET_PIZZA_INGREDIENTS, ingredients);
    },
  },
};
