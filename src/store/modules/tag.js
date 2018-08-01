import * as types from '../mutation-types';

const state = {
  tagList: []
};
const mutations = {
  [types.TAG_ADD](state, params) {
    if (state.tagList.some(v => v.path === params.path)) {
      return false;
    }
    state.tagList.push(Object.assign({}, params));
    //window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
  },
  [types.TAG_DELETE](state) {

  }
};


export default {
  state,
  mutations
}
