import {
  ADD_TABS,
  DETELE_TABS
} from '../mutation-types';


const state = {
  tabList: []
};

const mutations = {
  [ADD_TABS](state, params) {
    if (state.tabList.some(v => v.path === params.path)) {
      return false;
    }
    state.tabList.push(Object.assign({}, params));
  },

  [DETELE_TABS](state, {
    path,
    name
  }) {
    let ientries = state.tagList.entries();
    for (let [i, v] of ientries) {
      if (v.path === path && name) {
        state.tagList.splice(i, 1);
        break;
      }
    }
  }
};

const actions = {

};


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
