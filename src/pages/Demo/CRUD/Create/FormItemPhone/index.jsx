import {Button, Col, Form, Input, Row, Select} from 'antd';
import React from 'react';

export const FormItemPhone = () => {
    return (
        <Form.Item label="手机号" required>
            <Row gutter={8}>
                <Col span={4}>
                    <Select
                        defaultValue={1}
                        options={[
                            {label: '+86', value: 1},
                        ]}
                    />
                </Col>
                <Col span={20}>
                    <Form.Item
                        name="phone"
                        noStyle
                        rules={[{required: true, message: '请输入手机号'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
        </Form.Item>
    );
};
