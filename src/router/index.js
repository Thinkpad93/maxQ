import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/index';

//const Layout = () => import('@/views/layout');

Vue.use(Router);


export const constantRouterMap = [{
    path: '/login',
    component: () =>
      import ('@/views/login'),
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home/index',
    children: [{
      path: '/home/index',
      name: 'home',
      component: () =>
        import ('@/views/home'),
      meta: {
        requiresAuth: true,
        title: "首页"
      }
    }]
  },
  {
    path: '/device',
    component: Layout,
    redirect: '/device/index',
    children: [{
        path: '/device/index',
        name: 'device',
        component: () =>
          import ('@/views/device/binding'),
        meta: {
          requiresAuth: true,
          title: "设备列表"
        }
      },
      {
        path: '/device/monitoring',
        name: 'monitoring',
        component: () =>
          import ('@/views/device/monitoring'),
        meta: {
          requiresAuth: true,
          title: "设备监控"
        }
      },
      {
        path: '/device/record',
        name: 'record',
        component: () =>
          import ('@/views/device/record'),
        meta: {
          requiresAuth: true,
          title: "设备检修记录"
        }
      },
      {
        path: '/device/runlog',
        name: 'runlog',
        component: () =>
          import ('@/views/device/runlog'),
        meta: {
          requiresAuth: true,
          title: "设备运行日志"
        }
      }
    ]
  },
  {
    path: '/school',
    component: Layout,
    redirect: '/school/index',
    children: [{
        path: '/school/index',
        name: 'school',
        component: () =>
          import ('@/views/campus/schoolmanagement/index'),
        meta: {
          requiresAuth: true,
          title: "学校管理"
        }
      },
      {
        path: '/school/details/:schoolId',
        name: 'schoolDetails',
        component: () =>
          import ('@/views/campus/schoolmanagement/details'),
        meta: {
          requiresAuth: true,
          title: "学校信息详情"
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
        name: 'column',
        component: () =>
          import ('@/views/content/column'),
        meta: {
          requiresAuth: true,
          title: "栏目管理"
        }
      },
      {
        path: '/content/columntpl',
        name: 'columntpl',
        component: () =>
          import ('@/views/content/columntpl'),
        meta: {
          requiresAuth: true,
          title: "栏目模板"
        }
      },
      {
        path: '/content/upload',
        name: 'upload',
        component: () =>
          import ('@/views/content/upload'),
        meta: {
          requiresAuth: true,
          title: "我的上传"
        }
      },
      {
        path: '/content/uploadContent',
        name: 'uploadContent',
        component: () =>
          import ('@/views/content/upload/add'),
        meta: {
          requiresAuth: true,
          title: "上传内容"
        }
      },
      {
        path: '/content/uploadContentEdit/:id',
        name: 'uploadContentEdit',
        component: () =>
          import ('@/views/content/upload/edit'),
        meta: {
          requiresAuth: true,
          title: "上传内容编辑"
        }
      },
      {
        path: '/content/poster',
        name: 'poster',
        component: () =>
          import ('@/views/content/poster'),
        meta: {
          requiresAuth: true,
          title: "海报编辑"
        }
      },
      {
        path: '/content/trial',
        name: 'trial',
        component: () =>
          import ('@/views/content/trial'),
        meta: {
          requiresAuth: true,
          title: "内容初审"
        }
      },
      {
        path: '/content/review',
        name: 'review',
        component: () =>
          import ('@/views/content/review'),
        meta: {
          requiresAuth: true,
          title: "内容复审"
        }
      },
      {
        path: '/content/final',
        name: 'final',
        component: () =>
          import ('@/views/content/final'),
        meta: {
          requiresAuth: true,
          title: "内容终审"
        }
      },
      {
        path: '/content/prerelease',
        name: 'prerelease',
        component: () =>
          import ('@/views/content/prerelease'),
        meta: {
          requiresAuth: true,
          title: "预发布"
        }
      },
      {
        path: '/content/release',
        name: 'release',
        component: () =>
          import ('@/views/content/release'),
        meta: {
          requiresAuth: true,
          title: "内容发布"
        }
      },
      {
        path: '/content/playform',
        name: 'playform',
        component: () =>
          import ('@/views/content/playform'),
        meta: {
          requiresAuth: true,
          title: "学校播放表单"
        }
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    children: [{
        path: 'permissions',
        name: 'permissions',
        component: () =>
          import ('@/views/user/permissions'),
        meta: {
          requiresAuth: true,
          title: "权限管理"
        }
      },
      {
        path: 'account',
        name: 'account',
        component: () =>
          import ('@/views/user/account'),
        meta: {
          requiresAuth: true,
          title: "账号管理"
        }
      }
    ]
  },
  {
    path: '/label',
    component: Layout,
    redirect: '/label/index',
    children: [{
      path: '/label/index',
      name: 'label',
      component: () =>
        import ('@/views/label'),
      meta: {
        requiresAuth: true,
        title: "标签管理"
      }
    }]
  }
]


export default new Router({
  //mode: 'history', //取消导航中的 # 
  routes: constantRouterMap
});
