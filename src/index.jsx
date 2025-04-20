import React from 'react'
import ReactDOM from 'react-dom/client'
import {System} from "@/services";
import {generateRoutes} from "@/router/routes";
import '@/styles/index.scss';
import App from './App'

async function init() {
  // 获取用户的基本信息
  const {data: userInfo} = await System.getUserInfo();
  // 获取用户的权限数据
  const {data: userMenus} = await System.getUserMenus();

  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(<App userInfo={userInfo} userMenus={userMenus}/>)
}

init();