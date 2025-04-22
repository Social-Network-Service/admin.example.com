import {Button, Col, Form, Input, Row} from 'antd';
import React from 'react';

const imgStyle = {
    'box-sizing': 'border-box',
    'border': '1px solid rgba(0, 0, 0, 0.15)',
    'border-radius': '4px',
    'width': '120px',
    'height': '40px',
}

export const FormItemMail = () => {
    const [captchaUrl, setCaptchaUrl] = React.useState('/images/logo.png');
    return (
        <Form.Item label="邮箱" required>
            <Input placeholder='请输入'/>
        </Form.Item>
    );
};
