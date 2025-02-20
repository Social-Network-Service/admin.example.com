import React, {useCallback, useEffect} from 'react';
import {Form} from 'antd';
import {ModalForm, ProFormText,} from '@ant-design/pro-components';

import {MenuActionData} from '../types';

interface MenuActionModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    data?: MenuActionData | null;
    onSuccess?: () => void;
}

export default ({visible, setVisible, data, onSuccess}: MenuActionModalProps) => {
    const [form] = Form.useForm();
    const title = `${data ? '更新' : '新增'}功能`;

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

    // 当弹窗打开且有编辑数据时，设置表单值
    useEffect(() => {
        if (visible && data) {
            form.setFieldsValue({
                name: data.name,
                code: data.code
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
                name="name"
                label="功能名称"
                placeholder="请输入功能名称"
                rules={[
                    {
                        required: true,
                        message: '请输入功能名称',
                    },
                ]}
            />
            <ProFormText
                name="code"
                label="标识"
                placeholder="请输入标识"
                rules={[
                    {
                        required: true,
                        message: '请输入标识',
                    },
                ]}
            />
        </ModalForm>
    );
};