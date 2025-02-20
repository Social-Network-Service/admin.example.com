import {MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons';
import {Breadcrumb} from 'antd';
import React, {useState,} from 'react';
import {useLocation, NavLink,} from 'react-router-dom';

export default (props) => {
    const location = useLocation();

    const {menuData} = props;
    let breadcrumbItems = [
        {name: '首页', path: '/Dashboard'},
    ];

    function dfs(item, parent, depth, chain) {
        if (item.path === location.pathname) {
            breadcrumbItems = breadcrumbItems.concat([...chain, item]).map(({name, path}) => ({name, path}));
            return false;
        }

        if (item.children) {
            for (let i = 0; i < item.children.length; i++) {
                const child = item.children[i];
                const result = dfs(child, item, depth + 1, [...chain, item]);
                if (!result) {
                    break;
                }
            }
        }

        return true
    }

    menuData.forEach(child => dfs(child, null, 1, []))

    var items = breadcrumbItems.map((item, index) => {
        return {
            title: index == 0 ? <NavLink to={item.path}>{item.name}</NavLink> : <span>{item.name}</span>
        }
    })

    var menu_fold = JSON.parse(localStorage.getItem("menu_fold")) || false;

    var [menuFold, setMenuFold] = useState(menu_fold);

    const setMenuFoldState = (val) => {
        setMenuFold(val);
        localStorage.setItem('menu_fold', val);
        window.dispatchEvent(new CustomEvent('change_menu_fold', {detail: val}))
    }

    const onClickToggleBtn = () => {
        setMenuFoldState(!menuFold)
    }

    return (
        <div style={{padding: '0 8px'}}>
            {
                menuFold
                    ? <MenuUnfoldOutlined onClick={onClickToggleBtn}
                                          style={{fontSize: '18px', color: 'var(--primary)', cursor: 'pointer'}}/>
                    : <MenuFoldOutlined onClick={onClickToggleBtn}
                                        style={{fontSize: '18px', color: 'var(--primary)', cursor: 'pointer'}}/>
            }

            <Breadcrumb
                style={{display: 'inline-block', marginLeft: '8px'}}
                items={items}
            />
        </div>
    );
};