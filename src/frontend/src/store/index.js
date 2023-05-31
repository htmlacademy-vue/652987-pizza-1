import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import { uniqueId } from "lodash";
import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from "@/store/mutation-types";
import { MESSAGE_LIVE_TIME } from "@/common/constants";
import VuexPlugins from "@/plugins/vuexPlugins";

Vue.use(Vuex);

const state = () => ({
  notifications: [],
});

const actions = {
  createNotification({ commit }, { ...notification }) {
    const uniqueNotification = {
      ...notification,
      id: uniqueId(),
    };

    commit(ADD_NOTIFICATION, uniqueNotification);
    setTimeout(
      () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
      MESSAGE_LIVE_TIME
    );
  },
};

export const mutations = {
  [ADD_NOTIFICATION](state, notification) {
    state.notifications = [...state.notifications, notification];
  },

  [DELETE_NOTIFICATION](state, id) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== id
    );
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules,
  plugins: [VuexPlugins],
});
