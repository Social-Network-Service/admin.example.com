import React from 'react';
import {BrowserRouter,} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import Router from '@/router'
import "./App.scss"

export default ({userInfo, userMenus}) => {
  console.log({userInfo, userMenus})
  console.log('--- Render App ---')
  return (
    <ConfigProvider theme={{token: {colorPrimary: '#1890ff'}}}>
      <BrowserRouter>
        <Router userInfo={userInfo} userMenus={userMenus}/>
      </BrowserRouter>
    </ConfigProvider>
  );
}