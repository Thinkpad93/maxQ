import Vue from 'vue';
import Vuex from 'vuex';
//import * as mutations from './mutations';
//import * as actions from './actions';


import account from './modules/account';
import user from './modules/user';
import tag from './modules/tag';
import tabs from './modules/tabs';

Vue.use(Vuex);


const store = new Vuex.Store({
  // state: {
  //   userInfo: {
  //     name: ''
  //   }
  // },
  // mutations,
  // actions,
  modules: {
    account,
    user,
    tag,
    tabs
  }
});


export default store;
