import {
  TAG_ADD,
  TAG_DELETE
} from '../mutation-types';

const state = {
  tagList: []
};

const mutations = {

  [TAG_ADD](state, params) {
    if (state.tagList.some(v => v.path === params.path)) {
      return false;
    }
    state.tagList.push(Object.assign({}, params));
    console.log(state.tagList);
  },

  [TAG_DELETE](state, {
    path,
    name
  }) {
    //查找是否有该路由对象
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
  close({
    commit,
    state
  }, params) {
    return new Promise((resolve) => {
      commit('TAG_DELETE', params);
      resolve([...state.tagList]);
    });
  }
};


export default {
  state,
  mutations,
  actions
}
