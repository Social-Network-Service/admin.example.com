import React, {useRef, useState} from 'react';
import {Button, Space, Tag, Tooltip, Badge, Popconfirm} from 'antd';
import {PlusOutlined, EditOutlined, SettingOutlined} from '@ant-design/icons';
import {ActionType, ProColumns, ProTable} from '@ant-design/pro-components';
import {UserData, UserSearchParams, UserStatus} from './types';
import Create from './Create';
import usePopup from '@/hooks/usePopup';
import styles from './index.module.scss';
import {User} from "services/modules/User";

export default () => {
    const actionRef = useRef<ActionType>();
    const {visible: userModalVisible, setVisible: setUserModalVisible, show: showUserModal} = usePopup();
    const [userEditData, setUserEditData] = useState<UserData | null>(null);

    const handleEdit = (record: UserData) => {
        setUserEditData(record);
        showUserModal();
    };

    const columns: ProColumns<UserData>[] = [
        {
            title: '账号',
            dataIndex: 'name',
            width: 120,
            ellipsis: true,
            render: (text, record) => (
                <a className={'account-link'} onClick={() => handleEdit(record)}>
                    {record.name}
                </a>
            ),
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            search: false,
            width: 120,
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            search: false,
            width: 180,
            ellipsis: true,
        },
        {
            title: '游戏产品',
            dataIndex: 'products',
            search: false,
            width: 150,
            ellipsis: true,
            render: (_, record) => (
                <Space>
                    {record.products?.map(({id, name}) => (
                        <Tag key={id} color="blue">{name}</Tag>
                    ))}
                </Space>
            ),
        },
        {
            title: '技能组',
            dataIndex: 'skill_groups',
            search: false,
            width: 150,
            ellipsis: true,
            render: (_, record) => (
                <Space>
                    {record.skill_groups?.map(({id, name}) => (
                        <Tag key={id} color="green">{name}</Tag>
                    ))}
                </Space>
            ),
        },
        {
            title: '角色',
            dataIndex: 'roles',
            search: false,
            width: 150,
            ellipsis: true,
            render: (_, record) => (
                <Space>
                    {record.roles?.map(({id, name}) => (
                        <Tag key={id} color="purple">{name}</Tag>
                    ))}
                </Space>
            ),
        },
        {
            title: '最近登录时间',
            dataIndex: 'last_login',
            search: false,
            width: 150,
        },
        {
            title: '状态',
            dataIndex: 'status',
            search: false,
            width: 80,
            render: (_, record) => (
                <Badge
                    status={record.status === UserStatus.Enabled ? 'success' : 'error'}
                    text={record.status === UserStatus.Enabled ? '启用' : '禁用'}
                />
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            search: false,
            width: 150,
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            fixed: 'right',
            width: 350,
            render: (_, record) => {
                return (
                    <Space size={0} split={<span className="ant-divider ant-divider-vertical"/>}>
                        <Tag className={'link-tag'} onClick={() => {
                        }}>
                            角色权限
                        </Tag>
                        <Tag className={'link-tag'} onClick={() => {
                        }}>
                            游戏产品
                        </Tag>
                        <Tag className={'link-tag'} onClick={() => {
                        }}>
                            技能组
                        </Tag>
                        {record.status === UserStatus.Enabled ? (
                            <Popconfirm
                                title="确定要停用该账号吗？"
                                onConfirm={() => {
                                    // TODO: 调用停用API
                                }}
                            >
                                <Tag className={'link-tag'} color="error">停用</Tag>
                            </Popconfirm>
                        ) : (
                            <Popconfirm
                                title="确定要启用该账号吗？"
                                onConfirm={() => {
                                    // TODO: 调用启用API
                                }}
                            >
                                <Tag className={'link-tag'} color="success">启用</Tag>
                            </Popconfirm>
                        )}
                        <Tag
                            className={'link-tag'}
                            icon={<EditOutlined/>}
                            onClick={() => handleEdit(record)}
                        >
                            编辑
                        </Tag>
                    </Space>
                );
            },
        },
    ];

    const fetchUserList = async (params: UserSearchParams & {
        pageSize?: number;
        current?: number;
    }) => {
        const result: any = await User.getUserList(params);
        return {
            data: result?.data,
            success: true,
            total: result?.total,
        };
    };

    const handleUserModalVisibleChange = (visible: boolean) => {
        setUserModalVisible(visible);
        if (!visible) {
            setUserEditData(null);
        }
    };

    return (
        <div className={styles['user-page']}>
            <ProTable<UserData>
                options={false}
                rowKey="id"
                actionRef={actionRef}
                columns={columns}
                request={fetchUserList}
                scroll={{
                    x: 1600, // 所有列宽之和
                }}
                search={{
                    labelWidth: 'auto',
                }}
                toolbar={{
                    title: '账号管理',
                    actions: [
                        <Button
                            key="add"
                            type="primary"
                            icon={<PlusOutlined/>}
                            onClick={showUserModal}
                        >
                            创建账号
                        </Button>
                    ],
                }}
            />
            {userModalVisible && (
                <Create
                    visible={userModalVisible}
                    setVisible={handleUserModalVisibleChange}
                    data={userEditData}
                    onSuccess={() => {
                        actionRef.current?.reload();
                    }}
                />
            )}
        </div>
    );
};