import {getElement} from "./components";
import ProLayout from "@/layout/Layout";
import {Navigate} from "react-router-dom";
import React from "react";

export const constantRoutesList = [
  {
    path: '/login',
    element: getElement('/login'),
    hidden: true
  },
]

export function asyncGenerateRoutes(userMenus) {
  const dynamicRoutes = generateRoutes(userMenus);
  return [
    {
      path: '/',
      element: <ProLayout/>,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace/>,
        },
        {
          path: '/dashboard',
          element: getElement('/dashboard'),
        },
        {
          path: '/user_center',
          element: getElement('/user_center'),
        },
        ...dynamicRoutes,
        {
          path: '*',
          element: getElement('/404')
        }
      ]
    }
  ]
}

function generateRoutes(routers) {
  return routers.reduce((routes, item) => {
    if (item.path) {
      routes.push({
        path: item.path,
        element: getElement(item.path) || (
          <span
            key={item.path}>未找到路径{item.path}对应的页面组件，请检查router/components.jsx模块是否配置了对应的组件。</span>)
      });
    }
    if (item.routes && Array.isArray(item.routes)) {
      routes = routes.concat(generateRoutes(item.routes));
    }
    return routes;
  }, []);
}