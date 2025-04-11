import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {message, Spin} from 'antd'

import Logo from './logo'
import PasswordLogin from './passwordLogin'
import styles from './index.cjs'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const loginStart = () => {
        setLoading(true)
    }
    const loginSuccess = async () => {
        await message.success('登录成功', 2)

        navigate('/')
    }
    const loginFailed = () => {
        setLoading(false)
    }

    return (
        <div className={`${styles.loginContainer} un-select`}>
            <div className={`${styles.body} ${styles.fixWidth}`}>
                <div className={styles.top}>
                    <Logo className={styles.logos}/>
                    <div className={styles.desc}>开箱即用得中后台模板</div>
                </div>
                <div className={styles.main}>
                    <Spin spinning={loading} tip={'登陆中'}>
                        <PasswordLogin
                            loginStart={loginStart}
                            loginSuccess={loginSuccess}
                            loginFailed={loginFailed}
                        />
                    </Spin>
                </div>
                <div className={styles.footer}>
                    <div className={styles.desc}/>
                </div>
            </div>
        </div>
    )
}

export default Login
