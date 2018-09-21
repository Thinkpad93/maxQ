import db from "@/libs/db";
import {
  ADD_TABS,
  DETELE_TABS
} from '../mutation-types';
import {
  get
} from "http";


const state = {
  tabList: []
};

const mutations = {
  [ADD_TABS](state, params) {
    if (state.tabList.some(v => v.path === params.path)) {
      return false;
    }
    state.tabList.push({ ...params
    });
  },

  [DETELE_TABS](state, params) {
    let ientries = state.tabList.entries();
    for (let [i, v] of ientries) {
      if (v.path === params.path) {
        state.tabList.splice(i, 1);
        break;
      }
    }
  }
};

const actions = {
  removeTabs({
    commit,
    state
  }, params) {
    return new Promise(resolve => {
      commit('DETELE_TABS', params);
      resolve([...state.tabList]);
    });
  }
};


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
