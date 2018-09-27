import lazy from './lazyLoading';

function filterAsyncRouter(asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      route.component = lazy(route.component);
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    return true;
  })
  return accessedRouters;
}

export default filterAsyncRouter
