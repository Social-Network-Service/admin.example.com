import {TypingCard} from '@/components';
import {Modal, Card, Button, Space} from 'antd';

export default () => {
    const source1 = `
  <ul>
    <li>展示一个对话框，提供标题、内容区、操作区。</li>
    <li><a target="_blank" href="https://ant-design.antgroup.com/components/modal-cn">组件文档链接</a></li>
  </ul>
  `

    const source2 = `
  <ol>
    <li>Modal 不显示icon，设置 icon: null</li>
    <li>Modal 垂直居中展示，设置 centered: true</li>
    <li>静态方法弹框。Modal.info({}) Modal.confirm({})。</li>
  </ol>
  `

    return (
        <Space direction="vertical" size="small" style={{display: 'flex'}}>
            <TypingCard title='何时使用' source={source1}></TypingCard>
            <TypingCard title='使用总结' source={source2}></TypingCard>

            <Card title='用JSON.stringify显示JSON对象的对话框'>
                <Button type="primary" onClick={() => {
                    const obj = {
                        name: 'Tome',
                        age: 18,
                        friends: [
                            {
                                name: "Jack",
                                age: 5,
                                info: "提供，例如网络游戏、金山毒霸会员服务、商城、博客(BLOG)、论坛(BBS)、聊天室、电子邮件、发表新闻 ProComponentsProComponentsProComponentsProComponentsProComponents",
                                sex: 1,
                            }
                        ]
                    }
                    Modal.info({
                        title: '消息详情',
                        closable: true,
                        centered: true,
                        content: (
                            <div style={{whiteSpace: 'pre-wrap'}}>{`${JSON.stringify(obj, null, 2)}`}</div>
                        ),
                        maskClosable: true,
                        icon: null,
                        footer: null,
                    });
                }}>点击我显示</Button>
            </Card>
        </Space>
    )
}