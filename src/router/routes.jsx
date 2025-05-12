import React from 'react';
import {Navigate} from "react-router-dom";
import ProLayout from "@/layout/ProLayout";
import {isAuthenticated} from "@/utils";
import {getElement} from "./components";

export let routes = [];
export let routeMap = new Map();
export let routeList = [];

// 递归构建路由列表
export const buildRouteList = (routes) => {
  return routes.reduce((acc, route) => {
    acc.push({...route});

    route.children && acc.push(...buildRouteList(route.children))

    return acc;
  }, []);
};

export function generateRoutes(userInfo, userMenus) {
  // 生成动态路由配置
  const dynamicRoutes = generateRoutesFromMenus(userMenus);

  routes = [
    // 公共路由
    {
      path: '/login',
      element: getElement('/login'),
      meta: {
        title: '登录',
        hideInMenu: true
      }
    },
    {
      path: '/',
      element: isAuthenticated()
        ? <ProLayout userInfo={userInfo} userMenus={userMenus}/>
        : <Navigate to="/login" replace/>,
      children: [
        {
          path: '/',
          element: <Navigate to="/dashboard" replace/>,
          index: true,
        },
        {
          path: '/dashboard',
          element: getElement('/dashboard'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/user_center',
          element: getElement('/user_center'),
          meta: {
            title: '用户中心'
          }
        },
        // 添加动态生成的路由
        ...dynamicRoutes,
        // 404 路由放在最后
        {
          path: '*',
          element: getElement('/404'),
          meta: {
            title: '404',
            hideInMenu: true
          }
        }
      ]
    }
  ];

  routeList = buildRouteList(routes);

  routeList.forEach(route => routeMap.set(route.path, route));

  console.log({routes, routeList, routeMap})

  return routes;
}

// 递归处理菜单数据，生成路由配置
export const generateRoutesFromMenus = (menus) => {
  if (!menus) return [];

  const routes = menus.map(menu => {
    // 如果没有routes，说明是菜单组，继续处理子菜单
    if (menu.routes) {
      return generateRoutesFromMenus(menu.routes);
    }

    // 如果有路径，创建路由配置
    if (menu.path) {
      const element = getElement(menu.path) ||
        (<span>未找到路径{menu.path}对应的页面组件，请检查router/components.jsx模块是否配置了对应的组件。</span>)

      return {
        path: menu.path,
        element,
        meta: {
          title: menu.name
        }
      }
    }

    return null;
  })

  return routes.filter(Boolean).flat(Infinity);
};

export function getRouteName(path) {
  // 从路由配置中获取页面标题
  const route = routeList.find(route => (route.path === path));

  if (route && route.meta && route.meta.title) {
    return route.meta.title;
  }

  return '未知页面';
}