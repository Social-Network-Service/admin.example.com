import React from 'react';
import {Button, Card, Checkbox, Col, Form, Input, Row, Space} from 'antd';
import {TypingCard} from "@/components";

export default () => {
    const source1 = `
  <ul>
    <li><a target="_blank" href="https://ant-design.antgroup.com/components/form-cn">组件文档链接</a></li>
  </ul>
  `

    const source2 = `
  <ol>
    <li>FormItem 的 validateFirst 属性设置为true，当某一规则校验不通过时，停止剩下的规则的校验。</li>
  </ol>
  `

    const rules = [
        {
            validator: async (_, value) => {
                console.log('验证必填')
                if (!value) {
                    return Promise.reject(`用户名为必填项!`);
                }
                return Promise.resolve();
            },
        },
        {
            validator: (_, value) => {
                console.log('验证格式')
                const phone = value.replace(/\s/g, '');
                if (!/^1[3-9]\d{9}$/.test(phone)) {
                    return Promise.reject('格式不正确');
                }
                return Promise.resolve();
            },
        }
    ]
    return (
        <Space direction="vertical" size="small" style={{display: 'flex'}}>
            <TypingCard title='何时使用' source={source1}></TypingCard>
            <TypingCard title='使用总结' source={source2}></TypingCard>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card title='登录表单'>
                        <Form
                            name="basic"
                            validateTrigger={['onBlur']}
                        >
                            <Form.Item
                                label="用户名"
                                name="username"
                                rules={rules}
                                validateFirst={true}
                            >
                                <Input/>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Space>
    )
}