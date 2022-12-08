import { LOGIN, LOGOUT } from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    user: null,
  },

  mutations: {
    [LOGOUT](state) {
      state.user = null;
    },
    [LOGIN](state, data) {
      state.user = data;
    },
  },
  actions: {
    async [LOGIN]({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },
    async [LOGOUT]({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(LOGOUT);
    },

    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(LOGIN, data);
      } catch {
        // Note: in case of not proper login, i.e. token is expired
        dispatch(LOGOUT, false);
      }
    },
  },
};
