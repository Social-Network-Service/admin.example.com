import {Row, Col, Card, Space} from 'antd';
import {TypingCard} from '@/components'
import './index.css'

export default () => {
  const content1 = `<ul>
            <li>栅格布局：用于列表多项布局</li>
            <li><a target="_blank" href="https://ant-design.antgroup.com/components/grid-cn">Row Col 组件文档链接</a></li>
          </ul>`
  const content2 = `<ul>
            <li>栅格系统区域按照 24 等分的原则进行划分。信息区块我们称之为『盒子』。</li>
            <li>设置<b>Col 区块间隔</b> 使用 Row 的 gutter 属性。(注意：不要直接设置Col元素的padding值，不然间距会消失）</li>
            <li>设置<b>Col 区块垂直间距</b> ，可以写成数组形式 [水平间距, 垂直间距] [16, { xs: 8, sm: 16, md: 24, lg: 32 }]。</li>
            <li>Col 的宽度 <b>使用 span={列数}</b> 进行设置 (不能一次性设置所有Col的宽度 &lt;Row span={123}/&gt; 不生效)</li>
            <li> 
                响应式设计，预设六个响应尺寸：xs sm md lg xl xxl。 &lt;Col xs={12} sm={12} md={8} lg={6} xl={4} xxl={4}&gt;
                <b>
                    <pre>
                        <code>
                          // xs 窗口宽度 < 576px
                          // sm 窗口宽度 ≥ 576px
                          // md 窗口宽度 ≥ 768px
                          // lg 窗口宽度 ≥ 992px
                          // xl 窗口宽度 ≥ 1200px
                          // xxl 窗口宽度 ≥ 1600px
                        </code>
                    </pre>
                </b>
            </li>
          </ul>`
  return (
    <Space direction="vertical" size="small" style={{display: 'flex'}}>
      <TypingCard title={'何时使用'} source={content1} height={'auto'}/>
      <TypingCard title={'使用总结'} source={content2} height={'auto'}/>

      <Card title={"设置5列平均分布的示例"}>
        <pre className='code-block'>
          <code className='code-block'>
            .list-item &#123;
            /*计算公式是： width = (100 % - (n-1) * gap) / n，这里 n = 5 （每行5个项目）*/
            flex: 0 0 calc((100% - (4 * 32px)) / 5);
            width: calc((100% - (4 * 32px)) / 5);
            &#125;
          </code>
        </pre>
        <Row className={'list'}>
          <Col className={'list-item'}>
            <Card>
              1/5
            </Card>
          </Col>
          <Col className={'list-item'}>
            <Card>
              1/5
            </Card>
          </Col>
          <Col className={'list-item'}>
            <Card>
              1/5
            </Card>
          </Col>
          <Col className={'list-item'}>
            <Card>
              1/5
            </Card>
          </Col>
          <Col className={'list-item'}>
            <Card>
              1/5
            </Card>
          </Col>
          <Col className={'list-item'}>
            <Card>
              1/5
            </Card>
          </Col>
        </Row>
      </Card>

      <Card title={'基础示例'}>
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
      </Card>

      <Card title={"设置 gutter 示例"}>
        <Row gutter={[16, 100]}>
          <Col span={8}>
            <Card title={'第一行'}>1/3</Card>
          </Col>
          <Col span={8}>
            <Card title={'第一行'}>1/3</Card>
          </Col>
          <Col span={8}>
            <Card title={'第一行'}>1/3</Card>
          </Col>
          <Col span={8}>
            <Card title={'第二行'}>1/3</Card>
          </Col>
        </Row>
      </Card>


    </Space>
  )
}