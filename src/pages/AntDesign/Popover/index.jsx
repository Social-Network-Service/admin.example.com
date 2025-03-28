import {TypingCard} from "@/components";
import {Space, Card, Flex, Popover, Button} from "antd";

export default () => {
    const source1 = `
    <ul>
        <li><a target="_blank" href="https://ant-design.antgroup.com/components/popover-cn">Popover组件文档链接</a></li>
    </ul>
    `

    const source2 = `
    <ol>
        <li><b>trigger</b>触发行为，可选 hover | focus | click | contextMenu，可使用数组设置多个触发行为。</li>
        <li><b>placement</b>气泡框位置，可选 top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom。</li>
    </ol>
    `
    const content = (
        <div>
            <p>Content</p>
            <p>Content</p>
        </div>
    );

    return (
        <Space direction='vertical' style={{display: 'flex'}}>
            <TypingCard title='何时使用' source={source1}></TypingCard>
            <TypingCard title='使用总结' source={source2}></TypingCard>
            <Card title="示例一：基本使用" size="small">
                <p>最简单的用法，浮层的大小由内容区域决定。</p>

                <Space>
                    <Popover content={content} title="Title" placement="topLeft">
                        <Button type="primary">Hover me</Button>
                    </Popover>
                    <Popover content={content} title="Title" trigger="click">
                        <Button type="primary">Click me</Button>
                    </Popover>
                    <Popover content={content} title="Title" placement="topRight">
                        <Button type="primary">Hover me (右上方显示)</Button>
                    </Popover>
                </Space>
            </Card>
        </Space>
    )
}