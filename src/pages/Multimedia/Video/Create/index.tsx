import React, {Ref, useEffect} from 'react'
import {Form, Input} from 'antd'
import {ModalForm, ProFormSelect, ProFormText, ProFormTextArea} from '@ant-design/pro-components'
import {Video} from '@/services'

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
        if (data?.videoId) {
            await Video.updateVideo(data.videoId, formData)
        } else {
            await Video.insertVideo(formData)
        }

        // @ts-ignore
        actionRef?.current?.reload()

        return true
    }


    const initialValues = {
        videoName: '视频name',
        videoUrl: '视频url',
    }

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
            <ProFormText
                label="视频名称"
                name="videoName"
                rules={[
                    {
                        required: true,
                        message: '请输入视频名称',
                    },
                ]}
            >
            </ProFormText>


            <ProFormTextArea
                label="视频路径"
                name="videoUrl"
            />
        </ModalForm>
    )
}