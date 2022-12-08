import { CREATE_ORDER, DELETE_ORDER, GET_ORDERS } from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    orders: [],
    formatOrders: [],
  },

  mutations: {
    [GET_ORDERS](state, orders) {
      state.orders = orders;
    },
    [DELETE_ORDER](state, id) {
      state.orders = state.orders.filter((e) => e.id !== id);
    },
  },

  actions: {
    async [GET_ORDERS]({ commit }) {
      const orders = await this.$api.orders.query();
      commit(GET_ORDERS, orders);
    },

    async [CREATE_ORDER](context, order) {
      await this.$api.orders.post(order);
    },

    async [DELETE_ORDER]({ commit }, id) {
      await this.$api.orders.delete(id);

      commit(DELETE_ORDER, id);
    },
  },
};
