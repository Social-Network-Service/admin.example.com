import {SearchOutlined,} from '@ant-design/icons';
import {Card, Col, Input, Row, theme,} from 'antd';
import React, {useEffect, useRef} from "react";

export default () => {
    const inputRef = useRef(null);
    const {token} = theme.useToken();

    useEffect(() => {
        console.log(inputRef.current);
    }, [])

    return (
        <Row gutter={[16, 16]} style={{width: '100%'}}>
            <Col span={8}>
                <Card title='标题'>
                    <Input
                        ref={inputRef}
                        style={{
                            borderRadius: 4,
                            marginInlineEnd: 12,
                            backgroundColor: token.colorBgTextHover,
                        }}
                        prefix={
                            <SearchOutlined
                                style={{
                                    color: token.colorTextLightSolid,
                                }}
                            />
                        }
                        placeholder="搜索方案"
                        variant="borderless"
                        onChange={(e) => {
                            console.log(e);
                        }}
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card title='标题'>
                    2
                </Card>
            </Col>
            <Col span={8}>
                <Card title='标题'>
                    3
                </Card>
            </Col>
        </Row>
    )
}