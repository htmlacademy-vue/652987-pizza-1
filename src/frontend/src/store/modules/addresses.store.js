import {
  ADD_ADDRESS,
  DELETE_ADDRESS,
  EDIT_ADDRESS,
  GET_ADDRESSES,
  RESET_ADDRESSES_STATE,
} from "@/store/mutation-types";

const initialState = () => ({
  addresses: [],
});

export default {
  namespaced: true,
  state: initialState(),

  mutations: {
    [RESET_ADDRESSES_STATE](state) {
      Object.assign(state, initialState());
    },
    [GET_ADDRESSES](state, addresses) {
      state.addresses = addresses;
    },
    [ADD_ADDRESS](state, addresses) {
      state.addresses = [...state.addresses, addresses];
    },
    [EDIT_ADDRESS](state, address) {
      const index = state.addresses.findIndex(({ id }) => id === address.id);

      if (~index) {
        state.addresses.splice(index, 1, address.id);
      }
    },
    [DELETE_ADDRESS](state, id) {
      state.addresses = state.addresses.filter((e) => e.id !== id);
    },
  },

  actions: {
    [RESET_ADDRESSES_STATE]({ commit }) {
      commit(RESET_ADDRESSES_STATE);
    },
    async [GET_ADDRESSES]({ commit }) {
      const addresses = await this.$api.addresses.query();
      commit(GET_ADDRESSES, addresses);
    },

    async [ADD_ADDRESS]({ commit }, address) {
      const data = await this.$api.addresses.post(address);

      commit(ADD_ADDRESS, data);
    },

    async [EDIT_ADDRESS]({ commit }, address) {
      await this.$api.addresses.put(address);

      commit(EDIT_ADDRESS);
    },

    async [DELETE_ADDRESS]({ commit }, id) {
      await this.$api.addresses.delete(id);

      commit(DELETE_ADDRESS, id);
    },
  },
};
