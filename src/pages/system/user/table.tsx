import {ProColumns} from "@ant-design/pro-table/es/typing";
import {Popconfirm, Space, Tag} from "antd";
import React from "react";
import {ActionType} from "utils/action";
import {UserRecord, Status} from "./types";
import {StatusMap} from "@/maps";

function getColumnsWidth(columns: ProColumns[]) {
    return columns
        .map((item) => {
            if (process.env.NODE_ENV === 'development' && !item.hasOwnProperty('width')) {
                console.warn(`注意：【${item.title}】列未设置宽度或最小宽度`)
            }
            return item.width || 0
        })
        .reduce((a: string | number, b: string | number) => Number(a) + Number(b), 0)
}

export const getTableProps = (
    params: any,
): {
    columns: ProColumns<UserRecord>[]
    scrollX: number | string
} => {
    const {onAction} = params

    const columns: ProColumns<UserRecord>[] = [
        {
            title: '账号',
            dataIndex: 'name',
            width: 120,
            ellipsis: true,
            render: (text, record: UserRecord) => (
                <a className={'account-link'} onClick={() => onAction(ActionType.UPDATE, record)}>
                    {record.userName}
                </a>
            ),
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            width: 120,
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            width: 180,
            ellipsis: true,
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 80,
            valueEnum: StatusMap,
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            search: false,
            width: 200,
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            search: false,
            width: 200,
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            fixed: 'right',
            align: 'center',
            width: 150,
            render: (_, record) => {
                return (
                    <Space>
                        <Popconfirm
                            title={`确定要${record.status === Status.Enabled ? '停用' : '启用'}吗?`}
                            onConfirm={() => onAction(record.status === Status.Enabled ? ActionType.DISABLE : ActionType.ENABLE, record)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a style={{color: record.status === Status.Enabled ? 'var(--error)' : 'var(--primary)',}}>
                                {record.status === Status.Enabled ? '停用' : '启用'}
                            </a>
                        </Popconfirm>
                        <a onClick={() => onAction(ActionType.UPDATE, record)}>编辑</a>
                        <Popconfirm
                            title={'确定要删除?'}
                            onConfirm={() => onAction(ActionType.DELETE, record)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a
                                style={{
                                    color: 'var(--error)',
                                }}
                            >
                                删除
                            </a>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ]
    const scrollX = getColumnsWidth(columns)

    return {
        columns,
        scrollX,
    }
}
