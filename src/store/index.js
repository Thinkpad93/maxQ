import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import tag from './modules/tag';

Vue.use(Vuex);


const store = new Vuex.Store({
  modules: {
    user,
    tag
  }
});


export default store;
