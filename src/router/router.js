import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/index';

Vue.use(Router);

const routeMap = [{
    path: '/login',
    component: () =>
      import('@/views/login')
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    children: [{
      path: '/home/index',
      name: 'home',
      component: () =>
        import ('@/views/home'),
      meta: {
        title: "首页"
      }
    }]
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
        title: "标签管理"
      }
    }]
  },
  {
    path: '/device',
    component: Layout,
    redirect: '/device/binding',
    children: [{
        path: '/device/binding',
        name: 'binding',
        component: () =>
          import ('@/views/device/binding'),
        meta: {
          title: "设备列表"
        }
      },
      {
        path: '/device/monitoring',
        name: 'monitoring',
        component: () =>
          import ('@/views/device/monitoring'),
        meta: {
          title: "设备监控"
        }
      },
      {
        path: '/device/record',
        name: 'record',
        component: () =>
          import ('@/views/device/record'),
        meta: {
          title: "设备检修记录"
        }
      },
      {
        path: '/device/runlog',
        name: 'runlog',
        component: () =>
          import ('@/views/device/runlog'),
        meta: {
          title: "设备运行日志"
        }
      }
    ]
  },
  {
    path: '/content',
    component: Layout,
    redirect: '/content/column',
    children: [{
        path: '/content/column',
        name: 'column',
        component: () =>
          import ('@/views/content/column'),
        meta: {
          title: "栏目管理"
        }
      },
      {
        path: '/content/columntpl',
        name: 'columntpl',
        component: () =>
          import ('@/views/content/columntpl'),
        meta: {
          title: "栏目模板"
        }
      },
      {
        path: '/content/upload',
        name: 'upload',
        component: () =>
          import ('@/views/content/upload/index'),
        meta: {
          title: "我的上传"
        }
      },
      {
        path: '/content/uploadContent',
        name: 'uploadContent',
        component: () =>
          import ('@/views/content/upload/add'),
        meta: {
          title: "上传内容"
        }
      },
      {
        path: '/content/uploadContentEdit/:id',
        name: 'uploadContentEdit',
        component: () =>
          import ('@/views/content/upload/edit'),
        meta: {
          title: "上传内容编辑"
        }
      },
      {
        path: '/content/trial',
        name: 'trial',
        component: () =>
          import ('@/views/content/trial'),
        meta: {
          title: "内容初审"
        }
      },
      {
        path: '/content/review',
        name: 'review',
        component: () =>
          import ('@/views/content/review'),
        meta: {
          title: "内容复审"
        }
      },
      {
        path: '/content/final',
        name: 'final',
        component: () =>
          import ('@/views/content/final'),
        meta: {
          title: "内容终审"
        }
      },
      {
        path: '/content/prerelease',
        name: 'prerelease',
        component: () =>
          import ('@/views/content/prerelease'),
        meta: {
          title: "预发布"
        }
      },
      {
        path: '/content/release',
        name: 'release',
        component: () =>
          import ('@/views/content/release'),
        meta: {
          title: "内容发布"
        }
      },
      {
        path: '/content/playform',
        name: 'playform',
        component: () =>
          import ('@/views/content/playform'),
        meta: {
          title: "学校播放表单"
        }
      }
    ]
  },
  {
    path: '/school',
    component: Layout,
    redirect: '/school/list',
    children: [{
        path: '/school/list',
        name: 'schoolList',
        component: () =>
          import('@/views/school/list'),
        meta: {
          title: "学校管理"
        }
      },
      {
        path: '/school/view/:id',
        name: 'schoolView',
        component: () =>
          import('@/views/school/view'),
        meta: {
          title: "学校详情查看"
        }
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/index',
    children: [{
        path: '/sys/permissions',
        name: 'permissions',
        component: () =>
          import ('@/views/sys/permissions'),
        meta: {
          requiresAuth: true,
          title: "权限管理"
        }
      },
      {
        path: '/sys/user',
        name: 'user',
        component: () =>
          import ('@/views/sys/user'),
        meta: {
          requiresAuth: true,
          title: "用户管理"
        }
      },
      {
        path: '/sys/menu',
        name: 'menu',
        component: () =>
          import ('@/views/sys/menu'),
        meta: {
          requiresAuth: true,
          title: "菜单管理"
        }
      }
    ]
  }
]
