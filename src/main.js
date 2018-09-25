// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';


import 'normalize.css/normalize.css';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/base.less';
import '@/styles/common.less';
import '@/iconfont/iconfont.css';



Vue.use(Element);


Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  //let token = localStorage.getItem('token');
  next();
  // if (!token) {
  //   return next({
  //     path: '/login'
  //   });
  // }
  //next();
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   next();
  // } else {
  //   next();
  // }
});

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
    this.$store.commit('user/dbget');
  },
})
