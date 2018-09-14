import Vue from 'vue';
import Vuex from 'vuex';
import * as mutations from './mutations';
import * as actions from './actions';


import account from './modules/account';
import tag from './modules/tag';

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    userInfo: {
      name: ''
    }
  },
  mutations,
  actions,
  modules: {
    account,
    tag
  }
});


export default store;
