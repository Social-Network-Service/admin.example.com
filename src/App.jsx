import React from 'react';
import {BrowserRouter,} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import {GlobalProvider} from "@/contexts/GlobalContext";
import "./App.scss"
import Router from "@/router";

export default () => {
  console.log('--- Render App ---')
  return (
    <GlobalProvider>
      <ConfigProvider theme={{token: {colorPrimary: '#1890ff'}}}>
        <BrowserRouter>
          <Router/>
        </BrowserRouter>
      </ConfigProvider>
    </GlobalProvider>
  );
}