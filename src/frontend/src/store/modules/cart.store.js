import {
  ADD_TO_CART,
  UPDATE_MISC,
  UPDATE_CART_ORDER,
  RESET_CART_STATE,
  SET_CART_ITEMS,
  DELETE_ITEM_CART,
  GET_MISC,
  UPDATE_COUNT_MISC,
} from "../mutation-types.js";
import { localeStorageService } from "@/services/localeStorage";

const initialState = () => ({
  orders: [],
  misc: [],
});

export default {
  namespaced: true,
  state: initialState(),
  getters: {
    orders(state) {
      return state.orders;
    },
    misc(state) {
      return state.misc;
    },
    miscPrice(state) {
      if (state.misc.length > 0) {
        let miscPrices = 0;

        miscPrices = state.misc
          .map((item) => item.count * item.price)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );
        return miscPrices;
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
      if (!state.orders.length) return 0;

      return getters.miscPrice + getters.cardsPrice;
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
    [GET_MISC](state, misc) {
      state.misc = misc;
    },
    [UPDATE_MISC](state, name) {
      state.misc.forEach((item) => {
        if (item.id === name.id) {
          item.count = name.count;
        }
      });
    },
    [UPDATE_COUNT_MISC](state, name) {
      state.misc.forEach((item) => {
        if (item.id === name.miscId) {
          item.count = item.count + name.quantity;
        }
      });
    },
    [UPDATE_CART_ORDER](state, name) {
      state.orders.forEach((item) => {
        if (item.name === name.name) {
          item.count = name.count;
        }
      });
    },
    [SET_CART_ITEMS](state, orders) {
      if (orders) {
        state.orders = orders;
        return;
      }

      state.orders = localeStorageService.getJSON("orders");
      if (localStorage.getItem("misc") !== null) {
        state.misc = localeStorageService.getJSON("misc");
      }
    },
    [RESET_CART_STATE](state) {
      Object.assign(state, initialState());
    },
    [DELETE_ITEM_CART](state) {
      if (state.orders.length) {
        state.orders.forEach((item, index) => {
          if (item.count === 0) {
            state.orders.splice(index, 1);
            localeStorageService.setJSON("orders", state.orders);

            if (!state.orders.length) {
              localeStorageService.setJSON("misc", initialState().misc);
            }
          }
        });
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
      localeStorageService.setJSON("orders", state.orders);
    },
    async [GET_MISC]({ commit }) {
      const data = await this.$api.builder.fetchMisc();

      commit(GET_MISC, data);
    },
    [UPDATE_MISC]({ state, commit }, newValue) {
      commit(UPDATE_MISC, newValue);
      localeStorageService.setJSON("misc", state.misc);
    },
    [UPDATE_COUNT_MISC]({ state, commit }, newValue) {
      commit(UPDATE_COUNT_MISC, newValue);
      localeStorageService.setJSON("misc", state.misc);
    },
    [UPDATE_CART_ORDER]({ state, commit }, newValue) {
      commit(UPDATE_CART_ORDER, newValue);
      localeStorageService.setJSON("orders", state.orders);
    },
    [RESET_CART_STATE]({ commit }) {
      commit(RESET_CART_STATE, { root: true });
    },
    [SET_CART_ITEMS]({ commit }) {
      commit(SET_CART_ITEMS);
    },
    [DELETE_ITEM_CART]({ commit }) {
      commit(DELETE_ITEM_CART);
    },
  },
};
