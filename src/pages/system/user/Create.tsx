import React, {useCallback, useEffect} from 'react';
import {Form} from 'antd';
import {ModalForm, ProFormText} from '@ant-design/pro-components';
import {UserRecord} from './types';

interface UserModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    data?: UserRecord | null;
    onSuccess?: () => void;
}

export default ({visible, setVisible, data, onSuccess}: UserModalProps) => {
    const [form] = Form.useForm();
    const title = `${data ? '编辑' : '创建'}账号`;

    const handleCancel = useCallback(() => {
        setVisible(false);
        form?.resetFields();
    }, []);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            // TODO: 根据是否有 data 来判断是新增还是编辑
            onSuccess?.();
            return true;
        } catch (error) {
            console.error('Form validation failed:', error);
            return false;
        }
    };

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
            onFinish={handleSubmit}
            onOpenChange={setVisible}
            autoFocusFirstInput={!data}
            modalProps={{
                onCancel: handleCancel,
                maskClosable: false,
                destroyOnClose: true,
            }}
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
        </ModalForm>
    );
};
