import {TypingCard} from '@/components'
import {Modal, Row, Col, Card, Button, Space} from 'antd';

export default () => {
  const cardContent = `<ul>
            <li>啥也没写...</li>
          </ul>`

  return (
    <Space direction="vertical" size="small" style={{display: 'flex'}}>
      <TypingCard title={'总结'} source={cardContent} height={150}/>
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false} title='用JSON.stringify显示JSON对象的对话框'>
            <Button type="primary" onClick={() => {
              const obj = {
                name: 'Tome',
                age: 18,
                friends: [
                  {
                    name: "Jack",
                    age: 5
                  }
                ]
              }
              Modal.info({
                title: '消息详情',
                closable: true,
                content: (
                  <div style={{whiteSpace: 'pre'}}>{`${JSON.stringify(obj, null, 2)}`}</div>
                ),
                maskClosable: true,
                icon: null,
                footer: null,
              });
            }}>点击我显示</Button>
          </Card>
        </Col>
      </Row>
    </Space>
  )
}