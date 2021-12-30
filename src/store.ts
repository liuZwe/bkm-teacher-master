// 状态管理器VueX
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    mosize: { w: 0, h: 0 },
  },
  mutations: {
    changeSize(state, newValue) {
      state.mosize = newValue;
    },
  },
  actions: {},
});
