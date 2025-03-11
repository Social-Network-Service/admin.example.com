import {Row, Col, Card, Space} from 'antd';
import {TypingCard} from '@/components'

export default () => {
  const cardContent = `<ul>
            <li>栅格系统区域按照 24 等分的原则进行划分。信息区块我们称之为『盒子』。</li>
            <li>设置<b>区块间隔</b> 使用 Row 的 gutter 属性。</li>
            <li>如果需要垂直间距，可以写成数组形式 [水平间距, 垂直间距] [16, { xs: 8, sm: 16, md: 24, lg: 32 }]。</li>
          </ul>`

  return (
    <Space direction="vertical" size="small" style={{display: 'flex'}}>
      <TypingCard title={'使用总结'} source={cardContent} height={200}/>
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