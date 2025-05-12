import React, {Ref, useEffect} from 'react';
import {Form} from 'antd';
import {ModalForm, ProFormSelect, ProFormText} from '@ant-design/pro-components';
import {User} from "@/services";
import {StatusList} from "@/maps";
import {UserRecord} from './types';

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  data?: UserRecord | null;
  actionRef: Ref<any>
  onSuccess?: () => void;
}

export default ({visible, setVisible, data, actionRef, onSuccess}: Props) => {
  const [form] = Form.useForm();
  const title = `${data ? '编辑' : '创建'}账号`;

  useEffect(() => {
    data && form.setFieldsValue(data)
  }, [data])

  const onOpenChange = (open: boolean) => {
    if (!open) {
      form.resetFields()
      setVisible(false)
    }
  }

  const onFinish = async (formData: any): Promise<any> => {
    if (data?.userId) {
      await User.update(data.userId, formData)
    } else {
      await User.create(formData)
    }

    // @ts-ignore
    actionRef?.current?.reload()

    onSuccess?.();

    return true;
  };

  const initialValues = {
    userName: 'user',
    password: "123456",
    phone: '13800008001',
    email: 'user@example.com',
    status: "1",
  }

  useEffect(() => {
    if (visible && data) {
      form.setFieldsValue({
        userName: data.userName,
        phone: data.phone,
        email: data.email,
      });
    } else if (!visible) {
      form?.resetFields();
    }
  }, [visible, data]);

  return (
    <ModalForm
      width={500}
      title={title}
      form={form}
      open={visible}
      labelCol={{span: 4}}
      wrapperCol={{span: 20}}
      layout="horizontal"
      onFinish={onFinish}
      onOpenChange={onOpenChange}
      initialValues={initialValues}
      autoFocusFirstInput={!data}
    >
      <ProFormText
        name="userName"
        label="账号"
        placeholder="请输入账号"
        rules={[
          {
            required: true,
            message: '请输入账号',
          },
        ]}
      />
      <ProFormText
        name="password"
        label="密码"
        placeholder="请输入密码"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      />
      <ProFormText
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        rules={[
          {
            required: true,
            message: '请输入手机号',
          },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
          },
        ]}
      />
      <ProFormText
        name="email"
        label="邮箱"
        placeholder="请输入邮箱"
        rules={[
          {
            required: true,
            message: '请输入邮箱',
          },
          {
            type: 'email',
            message: '请输入正确的邮箱格式',
          },
        ]}
      />
      <ProFormSelect
        name="status"
        label="状态"
        rules={[{required: true}]}
        fieldProps={{
          options: StatusList,
          showSearch: true
        }}
      />
    </ModalForm>
  );
};
