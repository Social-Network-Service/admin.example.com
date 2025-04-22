import React from 'react';
import {Button, Card, Checkbox, Col, Form, Input, Row, Space} from 'antd';
import {TypingCard} from "@/components";

export default () => {
    const source1 = `
  <ul>
    <li>收集信息。</li>
    <li><a target="_blank" href="https://ant-design.antgroup.com/components/form-cn">组件文档链接</a></li>
  </ul>
  `

    const source2 = `
  <ol>
    <li>Form 组件设置 layout，可以对表单进行布局设置，支持 horizontal | vertical | inline。</li>
  </ol>
  `

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Space direction="vertical" size="small" style={{display: 'flex'}}>
            <TypingCard title='何时使用' source={source1}></TypingCard>
            <TypingCard title='使用总结' source={source2}></TypingCard>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card title='登录表单'>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password/>
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked" label={null}>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title={'表单混合布局'}>
                        <b>在 Form.Item 上单独定义 layout，可以做到一个表单多种布局。</b>
                        <Form
                            name="layout-multiple-horizontal"
                            layout="horizontal"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                        >
                            <Form.Item label="horizontal" name="horizontal" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                layout="vertical"
                                label="vertical"
                                name="vertical"
                                rules={[{ required: true }]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input />
                            </Form.Item>
                        </Form>
                        <br />
                        <Form
                            name="layout-multiple-vertical"
                            layout="vertical"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                        >
                            <Form.Item label="vertical" name="vertical" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                layout="horizontal"
                                label="horizontal"
                                name="horizontal"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Space>
    )
}