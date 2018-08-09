import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/index';

Vue.use(Router);


export const constantRouterMap = [
  {
    path: '/login',
    component: () => import ('@/views/login'),
  },
  {
    path: '/',
    component: Layout,
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: '首页',
        component: () => import ('@/views/home'),
        meta: {}
      }
    ]
  },
  {
    path: '/device',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: '设备列表',
        component: () => import ('@/views/device/binding'),
        meta: {}
      },
      {
        path: 'monitoring',
        name: '设备监控',
        component: () => import ('@/views/device/monitoring'),
        meta: {}        
      },
      {
        path: 'record',
        name: '检修记录',
        component: () => import ('@/views/device/record'),
        meta: {}        
      },      
      {
        path: 'runlog',
        name: '设备运行日志',
        component: () => import ('@/views/device/runlog'),
        meta: {}        
      }
    ]
  },
  {
    path: '/tag',
    name: '标签管理',
    component: () =>  import ('@/views/tag'),
    meta: {}
  }
]


export default new Router({
  mode: 'history', //取消导航中的 # 
  routes: constantRouterMap
});



