import {Row, Col, Card, Button, Space} from 'antd';
import {TypingCard} from '@/components'

export default () => {
  const cardContent = `<ul class="card-ul">
            <li>栅格系统区域按照 24 等分的原则进行划分。</li>
            <li>信息区块我们称之为『盒子』。</li>
          </ul>`

  return (
    <Space direction="vertical" size="middle" style={{display: 'flex'}}>
      <TypingCard title={'总结'} source={cardContent} height={178}/>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title={'基本使用'}>
            <Button type="primary">Row/Col</Button>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={'基本使用'}>
            <Button type="primary">Row/Col</Button>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}><Card title={'基本使用'}>
          <Button type="primary">Row/Col</Button>
        </Card></Col>
        <Col span={8}><Card title={'基本使用'}>
          <Button type="primary">Row/Col</Button>
        </Card></Col>
        <Col span={8}><Card title={'基本使用'}>
          <Button type="primary">Row/Col</Button>
        </Card></Col>
        <Col span={8}><Card title={'基本使用'}>
          <Button type="primary">Row/Col</Button>
        </Card></Col>
      </Row>
      <Row>
        <Col span={6}><Card title={'基本使用'}>
          <Button type="primary">Row/Col</Button>
        </Card></Col>
        <Col span={6}><Card title={'基本使用'}>
          <Button type="primary">Row/Col</Button>
        </Card></Col>
        <Col span={6}><Card title={'基本使用'}>
          <Button type="primary">Row/Col</Button>
        </Card></Col>
        <Col span={6}><Card title={'基本使用'}>
          <Button type="primary">Row/Col</Button>
        </Card></Col>
      </Row>

    </Space>
  )
}