import {Row, Col, Card, Button, Space} from 'antd';
import {TypingCard} from '@/components'

export default () => {
    const cardContent = `<ul class="card-ul">
            <li>栅格系统区域按照 24 等分的原则进行划分。</li>
            <li>信息区块我们称之为『盒子』。</li>
          </ul>`

    return (
        <Space direction="vertical" size="small" style={{display: 'flex'}}>
            <TypingCard title={'总结'} source={cardContent} height={178}/>
            <Row gutter={16}>
                <Col span={12}>
                    <Card title={'第一行'}>
                        1/2
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title={'第一行'}>
                        1/2
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title={'第一行'}>
                        1/2
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={8}><Card title={'第二行'}>
                    1/3
                </Card></Col>
                <Col span={8}><Card title={'第二行'}>
                    1/3
                </Card></Col>
                <Col span={8}><Card title={'第二行'}>
                    1/3
                </Card></Col>
                <Col span={8}><Card title={'第二行'}>
                    1/3
                </Card></Col>
            </Row>
            <Row>
                <Col span={6}><Card title={'第三行'}>
                    1/4
                </Card></Col>
                <Col span={6}><Card title={'第三行'}>
                    1/4
                </Card></Col>
                <Col span={6}><Card title={'第三行'}>
                    1/4
                </Card></Col>
                <Col span={6}><Card title={'第三行'}>
                    1/4
                </Card></Col>
            </Row>

        </Space>
    )
}