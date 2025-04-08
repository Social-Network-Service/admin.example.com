import React from 'react';
import {useRoutes, Navigate} from 'react-router-dom';
import ProLayout from '@/layout/ProLayout/index'
import components from './components'

// 递归处理菜单数据，生成路由配置
const generateRoutesFromMenus = (menus) => {
    if (!menus) return [];

    const routes = menus.map(menu => {
        // 如果没有routes，说明是菜单组，继续处理子菜单
        if (menu.routes) {
            return generateRoutesFromMenus(menu.routes);
        }

        // 如果有路径，创建路由配置
        if (menu.path) {
            const element = components[menu.path]
                ? React.createElement(components[menu.path])
                :
                <span>未找到路径{menu.path}对应的页面组件，请检查router/components.jsx模块是否配置了对应的组件。</span>
            return {
                path: menu.path,
                element
            }
        }

        return null;
    })

    return routes.filter(Boolean).flat(Infinity);
};

const Router = (props) => {
    const {userInfo, userMenus} = props;

    // 生成动态路由配置
    const dynamicRoutes = generateRoutesFromMenus(userMenus);

    console.log({dynamicRoutes});

    const routes = [
        {
            path: '/Login',
            element: React.createElement(components['/Login']),
        },
        {
            path: '/Logout',
            element: React.createElement(components['/Logout']),
        },
        {
            path: '/',
            element: <ProLayout userInfo={userInfo} userMenus={userMenus}/>,
            children: [
                {
                    path: '',
                    element: <Navigate to="/Dashboard" replace/>,
                },
                {
                    path: 'Dashboard',
                    element: React.createElement(components['/Dashboard']),
                },
                {
                    path: 'UserCenter',
                    element: React.createElement(components['/UserCenter']),
                },
                // 添加动态生成的路由
                ...dynamicRoutes,
                // 404 路由放在最后
                {
                    path: '*',
                    element: React.createElement(components['/404']),
                }
            ]
        }
    ];

    const element = useRoutes(routes);
    return element;
};

export default Router;