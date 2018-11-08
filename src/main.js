// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';



import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
Nprogress.configure({
  showSpinner: false
});


import filterAsyncRouter from "@/utils/filterAsyncRouter";
import {
  getToken
} from '@/utils/auth';


Vue.use(Element);


Vue.config.productionTip = false;

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  Nprogress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: `${from.path}`
      })
      Nprogress.done();
    } else {
      if (store.getters.menu.length === 0) {
        store.dispatch("comm/qxregion");
        store.dispatch('qxuser/querySystemMenus').then(res => {
          let rou = res.data.router; //返回的权限路由数据
          let r = filterAsyncRouter(rou);
          router.addRoutes(r);
        })
        next();
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      //next(`/login?redirect=${to.path}`)
      next(`/login?redirect`);
      Nprogress.done()
    }
  }
});

router.afterEach(() => {
  Nprogress.done()
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
