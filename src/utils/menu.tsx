// @ts-nocheck
import React from 'react';
import * as AntDesignIconMap from '@ant-design/icons';
import {SmileOutlined, HeartOutlined,} from '@ant-design/icons';

export const IconMap = {
    smile: <SmileOutlined/>,
    heart: <HeartOutlined/>,
};

export const getIcon = (icon) => {
    if (IconMap[icon]) {
        return IconMap[icon];
    } else if (icon && typeof icon === 'string') {
        let fixIconName = icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + 'Outlined';
        if (AntDesignIconMap[fixIconName] || AntDesignIconMap[icon]) {
            return React.createElement(AntDesignIconMap[fixIconName] || AntDesignIconMap[icon]);
        }
    }

    return null;
};

export const loopMenuItem = (menus: any[]): any[] => {
    if (!menus) return [];

    return menus.map(({icon, routes, ...item}) => ({
        name: item.name,
        path: item.path,
        icon: getIcon(icon),
        routes: routes && loopMenuItem(routes),
        hideInMenu: item.hideInMenu
    })).filter(item => !item.hideInMenu);
}
