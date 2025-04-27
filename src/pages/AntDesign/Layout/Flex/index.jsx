import {Row, Col, Card, Space} from 'antd';
import {TypingCard} from '@/components'
import {Button, Flex} from 'antd';

export default () => {
  const content1 = `<ul>
            <li><a target="_blank" href="https://ant.design/components/flex-cn">Flex 组件文档链接</a></li>
          </ul>`
  const content2 = `<ul>
            <li>Flex 组件的 gap 属性可以设置网格之间的间隙 'small' | 'middle' | 'large' | number</li>
          </ul>`
  return (
    <Space direction="vertical" size="small" style={{display: 'flex'}}>
      <TypingCard title={'何时使用'} source={content1} height={'auto'}/>
      <TypingCard title={'使用总结'} source={content2} height={'auto'}/>
      <Row gutter={16}>
        <Col span={12}>
          <Card title={'示例1'}>
            <Flex wrap gap="small">
              {Array.from({length: 24}, (_, i) => (
                <Button key={i} type="primary">按钮</Button>
              ))}
            </Flex>
          </Card>
        </Col>
      </Row>
    </Space>
  )
}