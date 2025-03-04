import React, {useState, useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {Dropdown,} from 'antd';
import {UserOutlined, LogoutOutlined,} from '@ant-design/icons';
import {ProLayout,} from '@ant-design/pro-components';

import Breadcrumb from '../Breadcrumb'
import {loopMenuItem} from "@/utils/menu";

let count = 1;
const defaultOpenKeys = ['/SACP', '/Demo']

export default (props) => {
    const {userInfo, userMenus} = props
    const [pathname, setPathname] = useState('/');
    const navigate = useNavigate();

    const menu_fold = JSON.parse(localStorage.getItem("menu_fold")) || false;
    const [collapsed, setCollapsed] = useState(menu_fold);
    const [openKeys, setOpenKeys] = useState(defaultOpenKeys);

    useEffect(() => {
        var onChangeMenuFoldState = (event) => {
            // console.log(event.detail)
            setCollapsed(event.detail)
        }
        window.addEventListener('change_menu_fold', onChangeMenuFoldState)

        return () => {
            window.removeEventListener('change_menu_fold', onChangeMenuFoldState)
        }
    }, [])

    const items = [
        {
            key: 'UserCenter',
            icon: <UserOutlined/>,
            label: '个人中心',
        },
        {
            key: 'Logout',
            icon: <LogoutOutlined/>,
            label: '退出登录',
        },
    ]

    const onClick = ({key}) => {
        navigate(`${key}`);
    };

    if (!userInfo || !userMenus) {
        return (
            <Outlet/>
        );
    }

    const routes = loopMenuItem(userMenus);
    const menus = {
        path: '/',
        routes
    }

    return (
        <ProLayout
            collapsed={collapsed}
            route={menus}
            // prefixCls={'seasun'}  // 定义组件的类名前缀
            fixSiderbar={true}    // 是否固定导航
            layout={'mix'}  // layout 的菜单模式，side：右侧导航，top：顶部导航, mix 混合
            location={{
                pathname,
            }}
            openKeys={openKeys}
            onOpenChange={(val) => {
                // 这里应该是 ProLayout 的 Bug
                if (count++ === 1 && val.length === 0) {
                    val = defaultOpenKeys
                }

                setOpenKeys(val)
            }}
            token={{
                header: {
                    colorBgMenuItemSelected: 'rgba(255,0,0,0.5)',
                },
            }}
            menu={{
                // 忽略收起时自动关闭菜单
                ignoreFlatMenu: true,
                // 菜单收起时，显示菜单名字
                collapsedShowGroupTitle: true,
            }}
            avatarProps={{
                src: userInfo?.avatar,
                size: 'small',
                title: userInfo?.name,
                render: (props, dom) => {
                    return (
                        <Dropdown
                            placement="bottomRight"
                            menu={{
                                items,
                                onClick
                            }}
                        >
                            {dom}
                        </Dropdown>
                    );
                },
            }}
            actionsRender={(props) => {
                return <span>actionsRender</span>;
            }}
            headerTitleRender={(logo, title, _) => {
                return <>
                    <img src="/images/logo.png" alt=""/>
                    <span>headerTitleRender</span>
                </>;
            }}
            headerContentRender={(props) => {
                return (<Breadcrumb {...props}></Breadcrumb>);
            }}
            menuFooterRender={(props) => {
                return (<span>menuFooterRender</span>);
            }}
            onMenuHeaderClick={(e) => console.log('onMenuHeaderClick:', e)}
            menuItemRender={(item, dom) => (
                <div
                    onClick={() => {
                        setPathname(item.path);
                        navigate(item.path);
                    }}
                >
                    {dom}
                </div>
            )}
            collapsedButtonRender={() => null}
        >
            <div className="main-container">
                <Outlet/>
            </div>
        </ProLayout>
    );
};