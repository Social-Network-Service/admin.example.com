import {getElement} from "./components";

export const constantRoutesList = [
  {
    path: '/login',
    element: getElement('/login'),
    hidden: true
  },
]

export let routes = [];
export let routeMap = new Map();
export let routeList = [];

export function getRouteName(path) {
  // 从路由配置中获取页面标题
  const route = routeList.find(route => (route.path === path));

  if (route && route.meta && route.meta.title) {
    return route.meta.title;
  }

  return '未知页面';
}