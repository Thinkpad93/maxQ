// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';


import 'normalize.css/normalize.css';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/site.less';
import '@/iconfont/iconfont.css';

import filterAsyncRouter from "@/utils/filterAsyncRouter";
import {
  getToken
} from '@/utils/auth';




Vue.use(Element);


Vue.config.productionTip = false;

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: `${from.path}`
      })
    } else {
      if (store.getters.menu.length === 0) {
        store.dispatch('qxuser/querySystemMenus').then(res => {
          let rou = res.data.router;
          let r = filterAsyncRouter(rou);
          router.addRoutes(r);
        })
        // store.dispatch('qxuser/qxGetUserInfo').then(res => {
        //   let rou = res.router;
        //   let r = filterAsyncRouter(rou);
        //   router.addRoutes(r);
        // })
        next();
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
});

router.afterEach(() => {});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  created() {},
  mounted() {
    //this.$store.commit('menu/dbget');
    //this.$store.commit('user/dbget');
  },
})
