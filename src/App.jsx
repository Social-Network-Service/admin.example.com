import React from 'react';
import {BrowserRouter,} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import Router from '@/router'
import "./App.scss"

export default ({userInfo, userMenus}) => {
    console.log({userInfo, userMenus})
    return (
        <ConfigProvider theme={{token: {colorPrimary: '#1890ff'}}}>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </ConfigProvider>
    );
}