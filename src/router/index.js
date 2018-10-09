import Vue from 'vue';
import Router from 'vue-router';
import layout from '@/views/layout';

Vue.use(Router);

export const constantRouterMap = [{
    path: '/login',
    component: () =>
      import ('@/views/login'),
  },
  {
    path: '/',
    component: layout,
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'home',
      component: () =>
        import ('@/views/home'),
      meta: {
        title: "首页"
      }
    }]
  },
  // {
  //   path: '*',
  //   component: layout,
  //   redirect: '/404',
  //   children: [{
  //     path: '/404',
  //     name: 'errorpage',
  //     component: () =>
  //       import ('@/views/errorpage'),
  //     meta: {
  //       title: "404页"
  //     }
  //   }]
  // }
  // {
  //   path: '/label',
  //   component: Layout,
  //   redirect: '/label',
  //   children: [{
  //     path: '/label',
  //     name: 'label',
  //     component: () =>
  //       import ('@/views/label'),
  //     meta: {
  //       requiresAuth: true,
  //       title: "标签管理"
  //     }
  //   }]
  // },
  // {
  //   path: '/device',
  //   component: Layout,
  //   redirect: '/device/binding',
  //   children: [{
  //       path: '/device/binding',
  //       name: 'binding',
  //       component: () =>
  //         import ('@/views/device/binding'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "设备列表"
  //       }
  //     },
  //     {
  //       path: '/device/monitoring',
  //       name: 'monitoring',
  //       component: () =>
  //         import ('@/views/device/monitoring'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "设备监控"
  //       }
  //     },
  //     {
  //       path: '/device/record',
  //       name: 'record',
  //       component: () =>
  //         import ('@/views/device/record'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "设备检修记录"
  //       }
  //     },
  //     {
  //       path: '/device/runlog',
  //       name: 'runlog',
  //       component: () =>
  //         import ('@/views/device/runlog'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "设备运行日志"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/school',
  //   component: Layout,
  //   redirect: '/school/list',
  //   children: [{
  //       path: '/school/list',
  //       name: 'schoolList',
  //       component: () =>
  //         import('@/views/school/list'),
  //       meta: {
  //         title: "学校管理"
  //       }
  //     },
  //     {
  //       path: '/school/views/:id',
  //       name: 'schoolView',
  //       component: () =>
  //         import('@/views/school/views'),
  //       meta: {
  //         title: "学校详情查看"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/school',
  //   component: Layout,
  //   redirect: '/school/index',
  //   children: [{
  //       path: '/school/index',
  //       name: 'school',
  //       component: () =>
  //         import ('@/views/campus/schoolmanagement/index'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "学校管理"
  //       }
  //     },
  //     {
  //       path: '/school/details/:schoolId',
  //       name: 'schoolDetails',
  //       component: () =>
  //         import ('@/views/campus/schoolmanagement/details'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "学校信息详情"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/content',
  //   component: Layout,
  //   redirect: '/content/index',
  //   children: [{
  //       path: '/content/index',
  //       name: 'column',
  //       component: () =>
  //         import ('@/views/content/column'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "栏目管理"
  //       }
  //     },
  //     {
  //       path: '/content/columntpl',
  //       name: 'columntpl',
  //       component: () =>
  //         import ('@/views/content/columntpl'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "栏目模板"
  //       }
  //     },
  //     {
  //       path: '/content/upload',
  //       name: 'upload',
  //       component: () =>
  //         import ('@/views/content/upload'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "我的上传"
  //       }
  //     },
  //     {
  //       path: '/content/uploadContent',
  //       name: 'uploadContent',
  //       component: () =>
  //         import ('@/views/content/upload/add'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "上传内容"
  //       }
  //     },
  //     {
  //       path: '/content/uploadContentEdit/:id',
  //       name: 'uploadContentEdit',
  //       component: () =>
  //         import ('@/views/content/upload/edit'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "上传内容编辑"
  //       }
  //     },
  //     {
  //       path: '/content/trial',
  //       name: 'trial',
  //       component: () =>
  //         import ('@/views/content/trial'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "内容初审"
  //       }
  //     },
  //     {
  //       path: '/content/review',
  //       name: 'review',
  //       component: () =>
  //         import ('@/views/content/review'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "内容复审"
  //       }
  //     },
  //     {
  //       path: '/content/final',
  //       name: 'final',
  //       component: () =>
  //         import ('@/views/content/final'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "内容终审"
  //       }
  //     },
  //     {
  //       path: '/content/prerelease',
  //       name: 'prerelease',
  //       component: () =>
  //         import ('@/views/content/prerelease'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "预发布"
  //       }
  //     },
  //     {
  //       path: '/content/release',
  //       name: 'release',
  //       component: () =>
  //         import ('@/views/content/release'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "内容发布"
  //       }
  //     },
  //     {
  //       path: '/content/playform',
  //       name: 'playform',
  //       component: () =>
  //         import ('@/views/content/playform'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "学校播放表单"
  //       }
  //     },
  //   ]
  // },
  // {
  //   path: '/sys',
  //   component: Layout,
  //   redirect: '/sys/permissions',
  //   children: [{
  //       path: '/sys/permissions',
  //       name: 'permissions',
  //       component: () =>
  //         import ('@/views/sys/permissions'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "权限管理"
  //       }
  //     },
  //     {
  //       path: '/sys/user',
  //       name: 'user',
  //       component: () =>
  //         import ('@/views/sys/user'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "用户管理"
  //       }
  //     },
  //     {
  //       path: '/sys/menu',
  //       name: 'menu',
  //       component: () =>
  //         import ('@/views/sys/menu'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "菜单管理"
  //       }
  //     },
  //     {
  //       path: '/sys/role',
  //       name: 'role',
  //       component: () =>
  //         import ('@/views/sys/role'),
  //       meta: {
  //         requiresAuth: true,
  //         title: "角色管理"
  //       }
  //     }
  //   ]
  // }
]


export default new Router({
  //mode: 'history', //取消导航中的 # 
  routes: constantRouterMap
});
