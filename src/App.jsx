import React, {useEffect, useState} from 'react';
import {BrowserRouter,} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import "./App.scss"

import Router from '@/router'
import {System} from "@/services";

export default function App() {
    const [state, setState] = useState({
        userInfo: null,
        userMenus: null,
    });

    useEffect(() => {
        // 获取用户的基本信息
        System.getUserInfo().then(result => {
            setState(prevState => ({
                ...prevState,
                userInfo: result.data
            }));
        });

        // 获取用户的权限数据
        System.getUserMenus().then(result => {
            setState(prevState => ({
                ...prevState,
                userMenus: result.data
            }));
        });
    }, []);

    if (!state.userInfo || !state.userMenus) {
        return ''
    }

    return (
        <ConfigProvider theme={{token: {colorPrimary: '#00b96b'}}}>
            <BrowserRouter>
                <Router {...state}></Router>
            </BrowserRouter>
        </ConfigProvider>
    );
}