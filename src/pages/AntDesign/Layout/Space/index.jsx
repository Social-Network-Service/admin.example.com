import {TypingCard} from "@/components";
import {Space, Card} from "antd";

export default () => {
  const source1 = `
  <ul>
    <li>避免组件紧贴在一起，拉开统一的空间。</li>
    <li>适合行内元素的水平间距。</li>
    <li><a target="_blank" href="https://ant-design.antgroup.com/components/space-cn">Space组件文档链接</a></li>
  </ul>
  `

  const source2 = `
  <ol>
    <li>使用 size 设置元素之间的间距，预设了 small、middle、large 三种尺寸，也可以自定义间距，若不设置 size，则默认为 small。</li>
    <li>相邻组件分隔符。&lt;Space split={&lt;Divider type="vertical" /&gt;}&gt;</li>
  </ol>
  `

  return (
    <Space direction='vertical' style={{display: 'flex'}}>
      <TypingCard title='何时使用' source={source1}></TypingCard>
      <TypingCard title='使用总结' source={source2}></TypingCard>
      <Card title="Card" size="small">
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card title="Card" size="small">
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card title="Card" size="small">
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Space>
  )
}