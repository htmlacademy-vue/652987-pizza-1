import {
  ADD_TO_CART,
  UPDATE_MICS,
  UPDATE_CART_ORDER,
  RESET_CART_STATE,
  SET_CART_ITEMS,
} from "../mutation-types.js";
import mics from "@/static/misc.json";
import { normalizePizza, setCartItems, getCartItems } from "@/common/helpers";
import { MICS_TYPES } from "@/common/constants";

const initialState = () => ({
  orders: [],
  mics: mics.map((item) => normalizePizza(item, MICS_TYPES)),
});

export default {
  namespaced: true,
  state: initialState(),
  getters: {
    orders(state) {
      if (state.orders.length) {
        state.orders.forEach((item, index) => {
          if (item.count === 0) {
            state.orders.splice(index, 1);
            setCartItems("orders", state.orders);
          }
        });
      }
      return state.orders;
    },
    mics(state) {
      return state.mics;
    },
    micsPrice(state) {
      if (state.mics.length > 0) {
        let micsPrices = 0;

        micsPrices = state.mics
          .map((item) => item.count * item.price)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );
        return micsPrices;
      }

      return 0;
    },
    cardsPrice(state) {
      if (state.orders.length > 0) {
        let cardsPrice = 0;

        cardsPrice = state.orders
          .map((item) => item.count * item.totalPrice)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );
        return cardsPrice;
      }

      return 0;
    },
    totalCartPrice(state, getters) {
      if (state.orders.length === 0) return 0;

      return getters.micsPrice + getters.cardsPrice;
    },
  },
  mutations: {
    [ADD_TO_CART](state, order) {
      state.orders.forEach((item, index) => {
        if (item.name === order.name) {
          state.orders.splice(index, 1);
        }
      });
      state.orders.push(order);
    },
    [UPDATE_MICS](state, name) {
      state.mics.forEach((item) => {
        if (name.buttonName === "minus") {
          if (item.value === name.inputName) {
            item.count -= 1;
          }
        } else {
          if (item.value === name.inputName) {
            item.count += 1;
          }
        }
      });
    },
    [UPDATE_CART_ORDER](state, name) {
      state.orders.forEach((item) => {
        if (name.buttonName === "minus") {
          if (item.name === name.inputName) {
            item.count -= 1;
          }
        } else {
          if (item.name === name.inputName) {
            item.count += 1;
          }
        }
      });
    },
    [SET_CART_ITEMS](state) {
      state.orders = getCartItems("orders");
      if (localStorage.getItem("mics") !== null) {
        state.mics = getCartItems("mics");
      }
    },
  },
  actions: {
    [ADD_TO_CART]({ state, commit, rootGetters }) {
      commit(ADD_TO_CART, {
        dough: rootGetters["builder/currentDough"],
        size: rootGetters["builder/currentSize"],
        sauce: rootGetters["builder/currentSauce"],
        ingredients: rootGetters["builder/currentIngredients"],
        name: rootGetters["builder/currentName"],
        totalPrice: rootGetters["builder/totalPrice"],
        count: 1,
      });
      setCartItems("orders", state.orders);
    },
    [UPDATE_MICS]({ state, commit }, newValue) {
      commit(UPDATE_MICS, newValue);
      setCartItems("mics", state.mics);
    },
    [UPDATE_CART_ORDER]({ state, commit }, newValue) {
      commit(UPDATE_CART_ORDER, newValue);
      setCartItems("orders", state.orders);
    },
    [RESET_CART_STATE](state) {
      Object.assign(state, initialState());
    },
    [SET_CART_ITEMS]({ commit }) {
      commit("SET_CART_ITEMS");
    },
  },
};
