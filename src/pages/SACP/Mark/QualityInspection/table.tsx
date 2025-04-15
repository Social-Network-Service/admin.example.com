import {ProColumns} from '@ant-design/pro-table/es/typing';
import {Popconfirm, Space, Tag} from 'antd';
import {ActionType} from '@/utils/action';
import {TABLE_COLUMN_PROPS} from "@/constants";

export function getColumns(params: any): ProColumns[] {
    const {onAction} = params;

    return [
        {
            title: '处理人',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            align: 'center',
            valueType: 'input',
        },
        {
            title: '关键帧标注',
            dataIndex: 'type',
            key: 'type',
            width: 100,
            valueType: 'select',
            hideInSearch: true,
        },
        {
            title: '优秀/未打分',
            dataIndex: 'type',
            key: 'type',
            width: 100,
            valueType: 'select',
            hideInSearch: true,
        },
        {
            ...TABLE_COLUMN_PROPS,
            width: 100,
            render: (value: any, record: any) => {
                return (
                    <Space>
                        <a onClick={() => onAction(ActionType.CHECK, record)}>查看</a>
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
