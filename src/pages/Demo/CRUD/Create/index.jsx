import React, {Ref, useEffect} from 'react'
import {Form, Input} from 'antd'
import {ModalForm, ProFormSelect, ProFormText, ProFormTextArea} from '@ant-design/pro-components'
import {Template} from '@/services'
import {UploadImage} from '@/components'
import {FormItemPhone} from "./FormItemPhone";
import {FormItemCard} from "./FormItemCard";
import {FormItemMail} from "./FormItemMail";
import {FormItemAreaServer} from "./FormItemAreaServer";
import {FormItemCaptcha} from "./FormItemCaptcha";

export default ({visible, setVisible, data, actionRef}) => {
    const [form] = Form.useForm()
    const title = data ? '编辑' : '创建'

    useEffect(() => {
        data && form.setFieldsValue(data)
    }, [data])

    const onOpenChange = (open) => {
        if (!open) {
            form.resetFields()
            setVisible(false)
        }
    }

    const onFinish = async (formData) => {
        if (data?.id) {
            await Template.templateUpdate({id: data.id, ...formData})
        } else {
            await Template.templateCreate({...formData})
        }

        // @ts-ignore
        actionRef?.current?.reload()

        return true
    }


    const initialValues = {
        name: '',
        type: '',
        code: '',
    }

    const handleImageChange = (response) => {
        console.log('Uploaded image response:', response);
    };

    return (
        <ModalForm
            width={600}
            form={form}
            title={title}
            open={visible}
            labelCol={{span: 4}}
            wrapperCol={{span: 20}}
            layout="vertical"
            onFinish={onFinish}
            onOpenChange={onOpenChange}
            initialValues={initialValues}
        >
            <FormItemPhone/>
            <FormItemCard/>
            <FormItemMail/>
            <FormItemAreaServer/>
            <FormItemCaptcha/>

            <Form.Item
                label="选择图片"
                name="images[]"
                rules={[
                    {
                        required: true,
                        message: '请选择图片',
                    },
                ]}
            >
                <UploadImage/>
            </Form.Item>
            <ProFormTextArea
                label="备注说明"
                name="code"
            />
        </ModalForm>
    )
}