import Vue from 'vue';
import Vuex from 'vuex';

//import account from './modules/account';
//import user from './modules/user';
//import tag from './modules/tag';
import tabs from './modules/tabs';
import menu from './modules/menu';
import qxuser from './modules/qxuser';
import comm from './modules/comm';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    //account,
    //user,
    //tag,
    tabs,
    menu,
    qxuser,
    comm
  },
  getters
});

export default store;
