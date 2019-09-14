import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    requirements: {}
  },
  mutations: {
    setRequirements (state, requirements) {
      state.requirements = requirements;
    }
  },
  getters: {
    requirements(state) {
      return state.requirements;
    }
  }
});
