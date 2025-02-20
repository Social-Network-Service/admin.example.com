import React, {useState, useCallback, useEffect} from 'react';
import {Row, Col, Tag, Tree, Empty, Button, Tooltip, Popconfirm, Space} from 'antd';
import {EditTwoTone, PlusOutlined} from "@ant-design/icons";
import {ProCard, ProTable} from '@ant-design/pro-components';
import {ProColumns} from "@ant-design/pro-table/es/typing";

import {getIcon} from "@/utils/menu";
import {Menu} from '@/services/modules/Menu';
import usePopup from '@/hooks/usePopup';

import Create from './Create';
import ActionCreate from './action/Create';
import {MenuData, MenuActionData, MenuTreeNode} from './types';
import './index.scss';

export const convertMenu = (menus: MenuData[]): MenuTreeNode[] => {
    return menus?.map((item: MenuData) => {
        return {
            data: item,
            icon: getIcon(item.icon),
            title: item.name,
            key: item.id,
            disabled: item.status === 0,
            children: item.routes && convertMenu(item.routes)
        }
    });
};

export default () => {
    const [menuTreeData, setMenuTreeData] = useState<MenuTreeNode[]>([]);
    const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
    const [menuActionList, setMenuActionList] = useState<MenuActionData[]>([]);
    const {visible: menuModalVisible, setVisible: setMenuModalVisible, show: showMenuModal} = usePopup();
    const {
        visible: menuActionModalVisible,
        setVisible: setMenuActionModalVisible,
        show: showMenuActionModal
    } = usePopup();
    const [menuEditData, setMenuEditData] = useState<MenuData | null>(null);
    const [menuActionEditData, setMenuActionEditData] = useState<MenuActionData | null>(null);

    const fetchMenuList = async () => {
        const result = await Menu.getMenuList();
        setMenuTreeData([
            {
                id: 0,
                key: 0,
                title: '反作弊系统',
                children: convertMenu(result.data),
                disabled: true
            }
        ]);
    };

    const fetchMenuActionList = async (menuId: number) => {
        const result = await Menu.getMenuActionList({menuId});
        setMenuActionList(result.data || []);
    };

    useEffect(() => {
        fetchMenuList();
    }, []);

    const handleTreeSelect = (selectedKeys: React.Key[]) => {
        if (selectedKeys.length === 0) {
            setSelectedMenuId(null);
            setMenuActionList([]);
            return;
        }
        const menuId = selectedKeys[0] as number;
        setSelectedMenuId(menuId)
        if (menuId && menuId !== 1) { // 排除根节点
            fetchMenuActionList(menuId);
        }
    };

    const titleRender = useCallback((nodeData: any) => {
        return (
            <div className={'menu-tree-title'}>
                <Row align={'middle'}>
                    <Col flex='auto' style={{overflow: 'hidden'}}>
                        {nodeData.name || nodeData.title || ''}
                    </Col>
                    <Col flex='none'>
                        <Space>
                            {/* 新增子菜单 */}
                            <Tooltip
                                title='添加子菜单'
                            >
                                <PlusOutlined
                                    style={{fontSize: '18px', color: 'var(--primary)'}}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedMenuId(nodeData.id);
                                        showMenuModal();
                                    }}
                                />
                            </Tooltip>

                            {/* 编辑 */}
                            <Tooltip
                                title='编辑菜单'
                            >
                                <EditTwoTone
                                    style={{fontSize: '18px'}}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedMenuId(nodeData.id);
                                        setMenuEditData(nodeData.data);
                                        showMenuModal();
                                    }}
                                />
                            </Tooltip>

                            {/* 授权 */}
                            <Tag
                                style={{
                                    fontSize: '12px',
                                    cursor: 'pointer'
                                }}
                                color="var(--primary)"
                            >
                                授权
                            </Tag>

                            {/* 启用|停用 */}
                            {nodeData.status === 1 ? (
                                <Tag
                                    color="var(--error)"
                                    style={{fontSize: '12px', cursor: 'pointer'}}
                                >
                                    停用
                                </Tag>
                            ) : (
                                <Tag
                                    color="var(--primary)"
                                    style={{fontSize: '12px', cursor: 'pointer'}}
                                >
                                    启用
                                </Tag>
                            )}
                        </Space>
                    </Col>
                </Row>
            </div>
        );
    }, []);

    const renderLeftTree = () => {
        return (
            <ProCard className={'menu-card'}>
                {menuTreeData?.length > 0 ? (
                    <Tree
                        showIcon
                        showLine={false}
                        treeData={menuTreeData}
                        defaultExpandedKeys={[0]}
                        titleRender={titleRender}
                        onSelect={handleTreeSelect}
                    />
                ) : (
                    <Empty/>
                )}
            </ProCard>
        );
    };

    const columns: ProColumns[] = [
        {
            title: '名称',
            dataIndex: 'name',
            width: 150,
            align: 'left',
        },
        {
            title: '编码',
            dataIndex: 'code',
            width: 100,
            align: 'left',
        },
        {
            title: '状态',
            dataIndex: 'state',
            width: 100,
            align: 'center',
            render: (state) => (
                <Tag color={state === 1 ? 'success' : 'error'}>
                    {state === 1 ? '启用' : '停用'}
                </Tag>
            ),
        },
        {
            title: "创建时间",
            dataIndex: 'create_time',
            width: 150,
            align: 'center',
        },
        {
            title: "更新时间",
            dataIndex: 'update_time',
            width: 150,
            align: 'center',
        },
        {
            title: "操作",
            dataIndex: 'operate',
            width: 200,
            align: 'center',
            render(value, record: any) {
                return (
                    <div className='operate'>
                        <Tag>授权</Tag>
                        <Tag onClick={() => {
                            setMenuActionEditData(record);
                            showMenuActionModal();
                        }}>编辑</Tag>
                        {record.state === 1 ? (
                            <Popconfirm
                                title={'确定要停用吗？'}
                                okText={'确定'}
                                cancelText={'取消'}
                            >
                                <Tag
                                    color="var(--error)"
                                >
                                    停用
                                </Tag>
                            </Popconfirm>

                        ) : (
                            <Tag
                                color="var(--primary)"
                            >
                                启用
                            </Tag>
                        )}
                    </div>
                )
            }
        },
    ];

    const headerTitle = () => {
        return (
            <Button
                disabled={!selectedMenuId}
                type="primary"
                onClick={() => {
                    showMenuActionModal();
                }}
            >
                增加功能
            </Button>
        );
    };

    const renderRightTable = () => {
        return (
            <ProTable<any>
                rowKey="id"
                options={false}
                cardBordered={false}
                search={false}
                dataSource={menuActionList}
                columns={columns}
                headerTitle={headerTitle()}
                scroll={{x: 'max-content'}}
                style={{width: '100%', overflow: 'auto'}}
            />
        );
    };

    const handleMenuModalVisibleChange = (visible: boolean) => {
        setMenuModalVisible(visible);
        if (!visible) {
            setMenuEditData(null);
        }
    };

    const handleMenuActionModalVisibleChange = (visible: boolean) => {
        setMenuActionModalVisible(visible);
        if (!visible) {
            setMenuActionEditData(null);
        }
    };

    return (
        <div className='menu-page'>
            <Row gutter={16} wrap={false} style={{width: '100%'}}>
                <Col flex='400px'>{renderLeftTree()}</Col>
                <Col flex='auto'>{renderRightTable()}</Col>
            </Row>
            {
                menuModalVisible && <Create
                    visible={menuModalVisible}
                    setVisible={handleMenuModalVisibleChange}
                    data={menuEditData}
                />
            }
            {
                menuActionModalVisible && <ActionCreate
                    visible={menuActionModalVisible}
                    setVisible={handleMenuActionModalVisibleChange}
                    data={menuActionEditData}
                />
            }
        </div>
    );
};