import React, {useState, useEffect} from 'react';
import {Outlet, useNavigate, useLocation} from 'react-router-dom';
import {Dropdown, message} from 'antd';
import {UserOutlined, LogoutOutlined} from '@ant-design/icons';
import {ProLayout} from '@ant-design/pro-components';

import Breadcrumb from '../Breadcrumb';
import TagsView from '@/components/TagsView';
import {loopMenuItem} from "@/utils/menu";
import './index.scss';

let count = 1;
const defaultOpenKeys = ['/SACP', '/Demo']

export default (props) => {
    const {userInfo, userMenus} = props
    const [pathname, setPathname] = useState('/');
    const navigate = useNavigate();
    const location = useLocation();

    const menu_fold = JSON.parse(localStorage.getItem("menu_fold")) || false;
    const [collapsed, setCollapsed] = useState(menu_fold);
    const [openKeys, setOpenKeys] = useState(defaultOpenKeys);

    useEffect(() => {
        var onChangeMenuFoldState = (event) => {
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
        if (key === 'Logout') {
            message.success('退出登录成功');
            // 这里添加您的登出逻辑
            return;
        }
        navigate(`${key}`);
    };

    if (!userInfo || !userMenus) {
        return <Outlet/>;
    }

    const routes = loopMenuItem(userMenus);
    const menus = {
        path: '/',
        routes
    }

    return (
        <ProLayout
            className={collapsed ? 'ant-pro-layout-collapsed' : ''}
            collapsed={collapsed}
            route={menus}
            fixSiderbar={true}
            layout={'mix'}
            location={{
                pathname,
            }}
            openKeys={openKeys}
            siderWidth={200}
            onOpenChange={(val) => {
                if (count++ === 1 && val.length === 0) {
                    val = defaultOpenKeys
                }
                setOpenKeys(val)
            }}
            token={{
                header: {
                    colorBgMenuItemSelected: '#1890ff',
                },
                sider: {
                    colorMenuBackground: '#001529',
                    colorTextMenu: 'rgba(255, 255, 255, 0.65)',
                    colorTextMenuSelected: '#fff',
                    colorBgMenuItemSelected: '#1890ff',
                },
            }}
            menu={{
                ignoreFlatMenu: true,
                collapsedShowGroupTitle: true,
                type: 'sub',
            }}
            avatarProps={{
                src: userInfo?.avatar || 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                size: 'small',
                title: userInfo?.name || '用户',
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
            headerTitleRender={(logo, title, _) => {
                return <>
                    <img src="/images/ant.svg" alt="" style={{ height: '32px', marginRight: collapsed ? '0' : '12px' }}/>
                    {!collapsed && <span style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>React Admin</span>}
                </>;
            }}
            headerContentRender={(props) => {
                return (<Breadcrumb {...props}></Breadcrumb>);
            }}
            menuItemRender={(item, dom) => (
                <div
                    onClick={() => {
                        setPathname(item.path);
                        navigate(item.path, {
                            state: { title: item.name }
                        });
                    }}
                >
                    {dom}
                </div>
            )}
            collapsedButtonRender={() => null}
        >
            <div className="main-container">
                <TagsView />
                <Outlet/>
            </div>
        </ProLayout>
    );
};