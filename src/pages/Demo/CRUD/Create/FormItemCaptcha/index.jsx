import {Button, Col, Form, Input, Row} from 'antd';
import React from 'react';

const imgStyle = {
    'box-sizing': 'border-box',
    'border': '1px solid rgba(0, 0, 0, 0.15)',
    'border-radius': '4px',
    'width': '120px',
    'height': '40px',
}

export const FormItemCaptcha = () => {
    const [captchaUrl, setCaptchaUrl] = React.useState('/images/logo.png');
    return (
        <Form.Item label="验证码" required>
            <Row gutter={8}>
                <Col span={20}>
                    <Form.Item
                        name="captcha"
                        noStyle
                        rules={[{required: true, message: 'Please input the captcha you got!'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <img src={captchaUrl} alt="" style={imgStyle}/>
                </Col>
            </Row>
        </Form.Item>
    );
};
