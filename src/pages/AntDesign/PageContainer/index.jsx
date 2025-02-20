import {EllipsisOutlined} from '@ant-design/icons';
import {PageContainer, ProCard} from '@ant-design/pro-components';
import {Button, Dropdown} from 'antd';
import './index.scss'

export default () => {

    const defaultProps = {
        fixedHeader: false,
        header: {
            title: '页面标题',
            ghost: true,
            breadcrumb: {
                items: [
                    {
                        path: '',
                        title: '一级页面',
                    },
                    {
                        path: '',
                        title: '二级页面',
                    },
                    {
                        path: '',
                        title: '当前页面',
                    },
                ],
            },
            extra: [
                <Button key="1">次要按钮</Button>,
                <Button key="2">次要按钮</Button>,
                <Button key="3" type="primary">
                    主要按钮
                </Button>,
                <Dropdown
                    key="dropdown"
                    trigger={['click']}
                    menu={{
                        items: [
                            {
                                label: '下拉菜单',
                                key: '1',
                            },
                            {
                                label: '下拉菜单2',
                                key: '2',
                            },
                            {
                                label: '下拉菜单3',
                                key: '3',
                            },
                        ],
                    }}
                >
                    <Button key="4" style={{padding: '0 8px'}}>
                        <EllipsisOutlined/>
                    </Button>
                </Dropdown>,
            ],
        },
        token: {
            paddingBlockPageContainerContent: 100,
            paddingInlinePageContainerContent: 60,
        }
    }

    return (
        <div
            className="page-container-page"
        >
            <PageContainer
                {...defaultProps}
                tabBarExtraContent="测试tabBarExtraContent"
                tabList={[
                    {
                        tab: '基本信息',
                        key: 'base',
                        closable: false,
                    },
                    {
                        tab: '详细信息',
                        key: 'info',
                    },
                ]}
                tabProps={{
                    type: 'editable-card',
                    hideAdd: true,
                    onEdit: (e, action) => console.log(e, action),
                }}
                /*footer={[
                    <Button key="3">重置</Button>,
                    <Button key="2" type="primary">
                        提交
                    </Button>,
                ]}*/
            >
                {/*<ProCard direction="column" ghost gutter={[0, 16]}>
                    <ProCard style={{height: 200}}/>
                    <ProCard gutter={16} ghost style={{height: 200}}>
                        <ProCard colSpan={16}/>
                        <ProCard colSpan={8}/>
                    </ProCard>
                </ProCard>*/}


            </PageContainer>

            总结
            使用 scrollbar-gutter: stable; 是最简单且有效的方法，可以避免滚动条出现时导致的布局抖动问题。如果需要支持旧版本的浏览器，可以使用
            JavaScript 动态调整容器的宽度。
            🤔 除了 `scrollbar-gutter` 属性，还有哪些方法可以解决滚动条影响布局的问题？

            <div style={{height: '3000px', backgroundColor: 'red'}}></div>
        </div>
    )
};