import {TypingCard} from '@/components'
import {Modal, Row, Col, Card, Button, Space} from 'antd';

export default () => {
    const info = () => {
        Modal.info({
            title: '消息详情',
            closable: true,
            content: (
                /*<div>
                    <p>some messages...some messages...</p>
                    <p>some messages...some messages...</p>
                </div>*/
                `${JSON.stringify({name: 'Tome', age: 18})}`
            ),
            maskClosable: true,
            icon: null,
            footer: null,
        });
    };

    const cardContent = ` <ul class="card-ul">
            <li>对复杂区域进行分组和隐藏，保持页面的整洁</li>
            <li>手风琴 是一种特殊的折叠面板，只允许单个内容区域展开</li>
          </ul>`

    return (
        <Space direction="vertical" size="small" style={{display: 'flex'}}>
            <TypingCard title={'总结'} source={cardContent} height={178}/>
            <Row gutter={16}>
                <Col span={12}>
                    <Card bordered={false} title='基本用法'>
                        <Button type="primary" onClick={info}>显示展示JSON内容的对话框</Button>
                    </Card>
                </Col>
            </Row>
        </Space>
    )
}