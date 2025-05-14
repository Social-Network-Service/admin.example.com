import React, {useState, useEffect} from 'react';
import {Outlet, useNavigate, useLocation} from 'react-router-dom';
import {Dropdown, message, Modal} from 'antd';
import {UserOutlined, LogoutOutlined} from '@ant-design/icons';
import {ProLayout} from '@ant-design/pro-components';
import {loopMenuItem} from "@/utils/menu";
import Breadcrumb from '../Breadcrumb';
import TagBar from '../TagBar';
import './index.scss';
import {logout} from "@/utils";
import {useGlobal} from "@/contexts/GlobalContext";

export default function Layout() {
  console.log('--- Render ProLayout ---')
  const globalData = useGlobal()
  const menu_fold = JSON.parse(localStorage.getItem("menu_fold")) || false;
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(menu_fold);
  const {userInfo, userMenus} = globalData;
  console.log({globalData})

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
      key: 'user_center',
      icon: <UserOutlined/>,
      label: '个人中心',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined/>,
      label: '退出登录',
    },
  ]

  const onClick = async ({key}) => {
    if (key === 'logout') {
      Modal.confirm({
        icon: null,
        centered: true,
        title: '提示！',
        content: '确定要退出系统吗?',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          logout();
          await message.success('退出登录成功', 2);
          navigate(`/`);
        }
      })
      return;
    }
    navigate(`${key}`);
  };

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
        pathname: location.pathname,
      }}
      siderWidth={200}
      avatarProps={{
        src: userInfo?.avatar || 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        size: 'small',
        title: userInfo?.name || '用户',
        render: (props, dom) => {
          return (
            <Dropdown
              placement="bottomRight"
              arrow={true}
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
            navigate(item.path);
          }}
        >
          {dom}
        </div>
      )}
      collapsedButtonRender={() => null}
    >
      <TagBar/>
      <div className="main-container">
        <Outlet/>
      </div>
    </ProLayout>
  );
};