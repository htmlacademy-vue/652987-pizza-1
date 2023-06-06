import { cloneDeep } from "lodash";
import { mutations } from "@/store";
import modules from "@/store/modules";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import pizzaData from "@/static/pizza.json";
import user from "@/static/user.json";
import {
  DOUGH_TYPES,
  INGREDIENT_TYPES,
  MISC_TYPES,
  SAUCE_TYPES,
  SIZE_TYPES,
} from "@/common/constants";
import { normalizePizza } from "@/common/helpers";

const initState = () => ({
  notifications: [],
});

export const generateMockStore = (actions) => {
  const modulesCopy = cloneDeep(modules);
  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }

  return new Vuex.Store({
    state: initState(),
    mutations,
    modules: modulesCopy,
    plugins: [VuexPlugins],
  });
};

export const setDough = (store) => {
  const doughs = pizzaData.dough.map((item) =>
    normalizePizza(item, DOUGH_TYPES)
  );
  store.commit("builder/GET_PIZZA_DOUGHS", doughs);
};

export const setSizes = (store) => {
  const sizes = pizzaData.sizes.map((item) => normalizePizza(item, SIZE_TYPES));
  store.commit("builder/GET_PIZZA_SIZE", sizes);
};

export const setSauces = (store) => {
  const sauces = pizzaData.sauces.map((item) =>
    normalizePizza(item, SAUCE_TYPES)
  );
  store.commit("builder/GET_PIZZA_SAUCE", sauces);
};

export const setIngredients = (store) => {
  const ingredients = pizzaData.ingredients.map((item) =>
    normalizePizza(item, INGREDIENT_TYPES)
  );
  store.commit("builder/GET_PIZZA_INGREDIENTS", ingredients);
};

export const setPizzaName = (store) => {
  store.commit("builder/SET_NAME_PIZZA", "testPizzaName");
};

export const setAdditionalItems = (store) => {
  const ingredients = pizzaData.ingredients.map((item) =>
    normalizePizza(item, MISC_TYPES)
  );
  store.commit("cart/GET_MISC", ingredients);
};

export const setAddresses = (store) => {
  store.commit("addresses/GET_ADDRESSES", [
    {
      id: 1,
      userId: "1",
      name: "Домик",
      street: "Зеленая",
      building: "1",
      flat: "1",
      comment: "Не звоните",
    },
  ]);
};

export const setOrder = (store, order) => {
  store.commit("builder/CHANGE_ORDER", order);
};

export const setOrders = (store, orders) => {
  store.commit("orders/GET_ORDERS", orders);
};

export const setPizzaItems = (store) => {
  store.commit("cart/SET_CART_ITEMS", [
    {
      id: "1",
      name: "Pizza name",
      dough: 1,
      sauce: 1,
      size: 1,
      ingredients: [
        {
          count: 1,
          id: 1,
          image: "/public/img/filling/mushrooms.svg",
          name: "Грибы",
          price: 33,
          value: "mushrooms",
        },
      ],
      totalPrice: 545,
      count: 1,
    },
  ]);
};

export const setUser = (store) => {
  store.commit("auth/LOGIN", user);
};
