import React, {useState, useEffect} from 'react';
import {Outlet, useNavigate, useLocation} from 'react-router-dom';
import {Dropdown, message, Modal} from 'antd';
import {UserOutlined, LogoutOutlined} from '@ant-design/icons';
import {ProLayout} from '@ant-design/pro-components';
import {loopMenuItem} from "@/utils/menu";
import Breadcrumb from '../Breadcrumb';
import TagsView from '../TagsView';
import './index.scss';

let count = 1;
// const defaultOpenKeys = ['/SACP', '/Demo']
const defaultOpenKeys = ['/AntDesign']
// const defaultOpenKeys = ['/Multimedia']

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

    const onClick = async ({key}) => {
        if (key === 'Logout') {
            Modal.confirm({
                title: '登出',
                content: '确定要退出系统吗?',
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                    await message.success('退出登录成功', 2);
                    // 这里添加您的登出逻辑
                    navigate(`${key}`);
                }
            })
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
                /*sider: {
                    colorMenuBackground: '#001529',
                    colorTextMenu: 'rgba(255, 255, 255, 1)',
                    colorTextMenuSelected: '#fff',
                    colorTextMenuItemHover: "#1890ff",
                    colorBgMenuItemSelected: '#1890ff',
                }*/
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
                    <img src="/images/ant.svg" alt="" style={{height: '32px', marginRight: collapsed ? '0' : '12px'}}/>
                    {!collapsed && <span style={{margin: 0, fontSize: '18px', fontWeight: 'bold'}}>React Admin</span>}
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
                            state: {title: item.name}
                        });
                    }}
                >
                    {dom}
                </div>
            )}
            collapsedButtonRender={() => null}
        >
            <TagsView/>
            <div className="main-container">
                <Outlet/>
            </div>
        </ProLayout>
    );
};