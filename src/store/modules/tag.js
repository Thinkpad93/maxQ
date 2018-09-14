import {
  TAG_ADD,
  TAG_DELETE
} from '../mutation-types';

const state = {
  tabList: []
};

const mutations = {

  [TAG_ADD](state, params) {
    if (state.tabList.some(v => v.path === params.path)) {
      return false;
    }
    state.tabList.push(Object.assign({}, params));
  },

  [TAG_DELETE](state, {
    path,
    name
  }) {
    //查找是否有该路由对象
    let ientries = state.tabList.entries();
    for (let [i, v] of ientries) {
      if (v.path === path && name) {
        state.tabList.splice(i, 1);
        break;
      }
    }
  }
};

const actions = {
  close({
    commit,
    state
  }, params) {
    return new Promise((resolve) => {
      commit('TAG_DELETE', params);
      resolve([...state.tabList]);
    });
  }
};


export default {
  state,
  mutations,
  actions
}
