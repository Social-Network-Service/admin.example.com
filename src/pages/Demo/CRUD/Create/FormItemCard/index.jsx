import {Button, Col, Form, Input, Row} from 'antd';
import React from 'react';

export const FormItemCard = () => {
    return (
        <Form.Item label="身份证" required>
            <Input placeholder='请输入'/>
        </Form.Item>
    );
};
