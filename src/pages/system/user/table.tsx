import {ProColumns} from "@ant-design/pro-table/es/typing";
import {Popconfirm, Space, Tag} from "antd";
import React from "react";
import {ActionType} from "utils/action";
import {UserRecord, UserStatus} from "./types";

export function getColumnsWidth(columns: ProColumns[]) {
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
            title: '状态',
            dataIndex: 'status',
            search: false,
            width: 80,
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            search: false,
            width: 150,
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            fixed: 'right',
            width: 200,
            render: (_, record) => {
                return (
                    <Space size={0}>
                        <Popconfirm
                            title={record.status === 1 ? '确定要停用吗?' : '确定要启用吗?'}
                            onConfirm={() => onAction(record.status === 1 ? ActionType.DISABLE : ActionType.ENABLE, record)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Tag
                                style={{
                                    color: record.status === 1 ? 'var(--error)' : 'var(--primary)',
                                }}
                            >
                                {record.status === 1 ? '停用' : '启用'}
                            </Tag>
                        </Popconfirm>
                        <Tag
                            className={'link-tag'}
                            onClick={() => onAction(ActionType.UPDATE, record)}
                        >
                            编辑
                        </Tag>
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
