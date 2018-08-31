import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/index';

Vue.use(Router);


export const constantRouterMap = [{
    path: '/login',
    component: () =>
      import ('@/views/login'),
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    children: [{
      path: 'index',
      name: '首页',
      component: () =>
        import ('@/views/home'),
      meta: {
        requiresAuth: true
      }
    }]
  },
  {
    path: '/device',
    component: Layout,
    redirect: '/device/index',
    children: [{
        path: 'index',
        name: '设备列表',
        component: () =>
          import ('@/views/device/binding'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'monitoring',
        name: '设备监控',
        component: () =>
          import ('@/views/device/monitoring'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'record',
        name: '设备检修记录',
        component: () =>
          import ('@/views/device/record'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'runlog',
        name: '设备运行日志',
        component: () =>
          import ('@/views/device/runlog'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/school',
    component: Layout,
    redirect: '/school/index',
    children: [{
        path: 'index',
        name: '学校管理',
        component: () =>
          import ('@/views/campus/schoolmanagement/index'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'details/:schoolId',
        name: '学校信息详情',
        component: () =>
          import ('@/views/campus/schoolmanagement/details'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/content',
    component: Layout,
    redirect: '/content/index',
    children: [{
        path: '/content/index',
        name: '栏目管理',
        component: () =>
          import ('@/views/content/column'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/content/columntpl',
        name: '栏目模板',
        component: () =>
          import ('@/views/content/columntpl'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/content/upload',
        name: '我的上传',
        component: () =>
          import ('@/views/content/upload'),
        meta: {}
      },
      {
        path: '/content/upload/add',
        name: '上传内容',
        component: () =>
          import ('@/views/content/upload/add'),
        meta: {}
      },
      {
        path: '/content/poster',
        name: '海报在线编辑',
        component: () =>
          import ('@/views/content/poster'),
        meta: {}
      },
      {
        path: '/content/columntpl/add',
        name: '新增栏目模板详细',
        component: () =>
          import ('@/views/content/columntpl/add'),
        meta: {}
      },
      {
        path: '/content/playform',
        name: '学校播放表单',
        component: () =>
          import ('@/views/content/playform'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/content/release',
        name: '内容发布',
        component: () =>
          import ('@/views/content/release'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: 'index',
    children: [{
        path: 'permissions',
        name: '权限管理',
        component: () =>
          import ('@/views/user/permissions'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'account',
        name: '账号管理',
        component: () =>
          import ('@/views/user/account'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/tag',
    component: Layout,
    redirect: '/tag/index',
    children: [{
      path: 'index',
      name: '标签管理',
      component: () =>
        import ('@/views/tag'),
      meta: {
        requiresAuth: true
      }
    }]
  }
]


export default new Router({
  mode: 'history', //取消导航中的 # 
  routes: constantRouterMap
});
