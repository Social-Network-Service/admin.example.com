import React, {useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom';
import {message, Spin} from 'antd'

import Logo from './logo'
import PasswordLogin from './passwordLogin'

import './index.scss'
import {useGlobal} from "@/contexts/GlobalContext";
import {System} from "services/modules/System";

const Login = () => {
  const {setIsLogin, setUserInfo, setUserMenus} = useGlobal();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const loginStart = () => {
    setLoading(true)
  }
  const loginSuccess = async () => {
    // 从URL中获取重定向参数
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get('redirect');
    // 跳转到指定页面或首页
    navigate(redirectPath || '/', {replace: true});
  }
  const loginFailed = () => {
    setLoading(false)
  }

  return (
    <div className={`loginContainer`}>
      <div className={`body`}>
        <div className={'top'}>
          <Logo className={'logos'}/>
          <div className={'desc'}>开箱即用的中后台模板</div>
        </div>
        <div className={'main'}>
          <Spin spinning={loading} tip={'登陆中'}>
            <PasswordLogin
              loginStart={loginStart}
              loginSuccess={loginSuccess}
              loginFailed={loginFailed}
            />
          </Spin>
        </div>
        <div className={'footer'}>
          <div className={'desc'}/>
        </div>
      </div>
    </div>
  )
}

export default Login
