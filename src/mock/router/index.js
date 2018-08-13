import Mock from 'mockjs';

const routes = [
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
    }
];

Mock.mock('/action/mod-xiaoq/router.action', /post/i, function (options) {
  return routes;
});
