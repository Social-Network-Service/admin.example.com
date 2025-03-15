import {ProColumns} from '@ant-design/pro-table/es/typing';
import {Popconfirm, Space, Tag} from 'antd';
import {ActionType} from '@/utils/action';
import {TABLE_COLUMN_OPTIONS} from "@/constants";

export function getColumns(params: any): ProColumns[] {
    const {onAction} = params;

    return [
        {
            key: 'videoName',
            title: '视频名称',
            dataIndex: 'videoName',
            width: 150,
            valueType: 'input',
        },
        {
            key: 'videoUrl',
            title: '视频路径',
            dataIndex: 'videoUrl',
            width: 150,
            valueType: 'input',
        },
        {
            key: 'create_time',
            title: '创建时间',
            dataIndex: 'create_time',
            width: 160,
            align: 'center',
            hideInSearch: true,
        },
        {
            key: 'update_time',
            title: '修改时间',
            dataIndex: 'update_time',
            width: 160,
            align: 'center',
            hideInSearch: true,
        },
        {
            ...TABLE_COLUMN_OPTIONS,
            title: '操作',
            width: 120,
            render: (value: any, record: any) => {
                return (
                    <Space>
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
    ] as ProColumns[];
}

export function getColumnsWidth(columns: ProColumns[]) {
    return columns
        .map((item) => {
            if (process.env.NODE_ENV === 'development' && !item.hasOwnProperty('width')) {
                console.warn(`注意：【${item.title}】列未设置宽度或最小宽度`)
            }
            return item.width || 0;
        })
        .reduce((a: string | number, b: string | number) => Number(a) + Number(b), 0)
}