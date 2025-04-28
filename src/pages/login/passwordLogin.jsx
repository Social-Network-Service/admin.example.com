import React, {useEffect} from 'react'
import {Form, Input, Button, Checkbox} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import {localStorageHandle} from '@/utils/storages'
import {System} from "@/services";

const {Item} = Form

const PasswordLogin = (props) => {
  const trigger = ['onChange', 'onBlur']
  const rules = {
    username: [
      {
        validator: (rule, value) => {
          try {
            if (value.length <= 0 || value.length > 16) {
              return Promise.reject('账号格式错误')
            } else {
              return Promise.resolve()
            }
          } catch (e) {
            return Promise.reject(e)
          }
        }
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码'
      },
      {
        type: 'string',
        min: 6,
        message: '密码最少6位'
      },
      {
        type: 'string',
        max: 16
      }
    ]
  }
  let initialValues = {
    remember: true,
    // username: '',
    // password: '',
    username: 'admin',
    password: '123456',
  }
  const itemConfig = {
    colon: false,
    hidden: false
  }

  const formRef = React.createRef()

  // 初始话登录信息 => 是否记住密码
  const initLogin = () => {
    const loginInfo = localStorageHandle.get('login_info')
    if (loginInfo && loginInfo.remember) {
      const {username, password} = loginInfo
      initialValues = {
        remember: true,
        username,
        password
      }
    } else {
      initialValues = {
        remember: false,
        username: '',
        password: ''
      }
    }
  }
  useEffect(() => initLogin, [])

  const onFinish = async values => {
    const {username, password, remember} = values
    const {loginStart, loginSuccess, loginFailed, loginComplete} = props
    loginStart && loginStart()
    if (remember) {
      localStorageHandle.set('login_info', {
        username,
        password,
        remember: true,
        expiration: new Date().valueOf() + (7 * 24 * 60 * 60 * 1000) // 有效期 7 天
      })
    } else {
      // 删除登录信息
      localStorageHandle.remove('login_info')
    }

    // 发送登录请求
    try {
      const response = await System.login({
        username,
        password
      })
      const {code, data} = response
      if (code == 200) {
        loginSuccess && loginSuccess()
      }
    } catch (error) {
      loginFailed && loginFailed(error)
    } finally {
      loginComplete && loginComplete()
    }
  }

  const handleLogin = () => {
    formRef.current.submit()
  }

  const onFinishFailed = error => {
    // const { values, errorFields, outOfDate } = error
    console.log('onFinishFailed', error)
  }

  const onFieldsChange = (changedFields, allFields) => {
    // console.log('onFieldsChange', changedFields, allFields );
  }

  const onValuesChange = (changedValues, allValues) => {
    // console.log('onValuesChange', changedValues, allValues );
  }

  return (
    <Form
      ref={formRef}
      name='passwordLogin'
      className={'loginForm'}
      scrollToFirstError={true}
      validateTrigger={trigger}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onFieldsChange={onFieldsChange}
      onValuesChange={onValuesChange}
    >
      <Item name='username' rules={rules.username} {...itemConfig} >
        <Input
          allowClear={true}
          maxLength={11}
          prefix={<UserOutlined/>}
          placeholder='请输入账号/手机号'
        />
      </Item>
      <Item name='password' rules={rules.password} {...itemConfig} >
        <Input
          maxLength={16}
          prefix={<LockOutlined/>}
          type='password'
          placeholder='请输入密码'
          onPressEnter={handleLogin}
        />
      </Item>
      <Item>
        <Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>记住密码</Checkbox>
        </Item>
        <a className={'loginFormForgot'} href='#!'>
          忘记密码
        </a>
      </Item>
      <Item>
        <Button type='primary' htmlType={'submit'} className={'loginFormButton'}>登录</Button>
      </Item>
      <Item>
        账号 ： admin ， 密码 ：123456
      </Item>
    </Form>
  )
}

export default PasswordLogin
