import {Row, Col, Card} from 'antd'
import BarChart from './BarChart'
import BarChart2 from './BarChart2'
import BarStackedChart from './BarStackedChart'
import './index.scss'

export default () => {
  return (
    <div className='analysis'>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title={'柱状图'}>
            <BarChart/>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={'柱状图'}>
            <BarChart2/>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={'柱状图'}>
            <BarStackedChart/>
          </Card>
        </Col>
      </Row>
    </div>
  )
}