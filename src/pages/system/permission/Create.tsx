import {Form, InputNumber} from 'antd';
import React, {useCallback, useEffect} from 'react';
import {
    ModalForm,
    ProFormText,
    ProFormSelect
} from '@ant-design/pro-components';
import {MenuData} from './types';

interface MenuModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    data?: MenuData | null;
    onSuccess?: () => void;
}

export default ({visible, setVisible, data, onSuccess}: MenuModalProps) => {
    const [form] = Form.useForm();
    const title = `${data ? '更新' : '创建'}菜单`;

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
                uni: data.uni,
                name: data.name,
                path: data.path,
                icon: data.icon,
                hide: Number(data.hide).toString(),
                order: data.order
            });
        } else if (!visible) {
            form?.resetFields();
        }
    }, [visible, data]);

    return (
        <ModalForm
            width={500}
            form={form}
            open={visible}
            onFinish={handleSubmit}
            title={title}
            onOpenChange={(open) => {
                if (!open) {
                    handleCancel();
                }
            }}
            autoFocusFirstInput={!data}
            modalProps={{
                onCancel: handleCancel,
                maskClosable: false,
                destroyOnClose: true,
            }}
        >
            <ProFormText
                name="uni"
                label="菜单唯一标识"
                rules={[
                    {
                        required: true
                    }
                ]}
            />
            <ProFormText
                name="name"
                label="名称"
                rules={[
                    {
                        required: true
                    }
                ]}
            />
            <ProFormText
                name="path"
                label="路径"
                rules={[
                    {
                        required: true
                    }
                ]}
            />
            <ProFormText name="icon" label="图标"/>
            <ProFormSelect
                name="hide"
                label="是否隐藏"
                valueEnum={{
                    0: "否",
                    1: "是"
                }}
            />
            <Form.Item
                name="order"
                label="排序"
            >
                <InputNumber
                    min={0}
                    autoFocus
                    style={{width: '100%'}}
                    placeholder='请输入'
                />
            </Form.Item>
        </ModalForm>
    );
};