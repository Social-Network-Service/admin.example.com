import React, {Ref, useEffect} from 'react'
import {Form, Input} from 'antd'
import {ModalForm, ProFormSelect, ProFormText, ProFormTextArea} from '@ant-design/pro-components'
import {Message} from '@/services'
import UploadImage from '@/components/UploadImage'

export type PopupProps = {
    visible: boolean
    setVisible: any
    title: string
    data: any
    actionRef: Ref<any>
}

export default ({title, visible, setVisible, data, actionRef}: PopupProps) => {
    const [form] = Form.useForm()

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
        let fun = null
        if (data?.id) {
            formData.id = data.id
            fun = Message.templateUpdate
        } else {
            fun = Message.templateCreate
        }

        await fun(formData)

        // @ts-ignore
        actionRef?.current?.reload()

        return true
    }


    const initialValues = {
        name: '',
        type: '',
        code: '',
    }

    const handleImageChange = (response: any) => {
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
            layout="horizontal"
            onFinish={onFinish}
            onOpenChange={onOpenChange}
            initialValues={initialValues}
        >
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