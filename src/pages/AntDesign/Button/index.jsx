import {Row, Col, Card, Button, Space} from 'antd';
import {TypingCard} from '@/components'

export default () => {
  const cardContent = `<ul>
            <li>啥也没写...</li>
          </ul>`

  return (
    <Space direction="vertical" size="small" style={{display: 'flex'}}>
      <TypingCard title={'总结'} source={cardContent} height={150}/>
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false} title='基本用法'>
            <Button type="primary">Button</Button>
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false} title='基本用法'>
            <Button type="primary">Button</Button>
          </Card>
        </Col>
      </Row>
    </Space>
  )
}