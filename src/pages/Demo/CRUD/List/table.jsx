import {Popconfirm, Space} from 'antd';
import {ActionType} from '@/utils/action';
import {TABLE_COLUMN_PROPS} from "@/constants";
import {StatusMap} from "@/maps";

export function getColumnsWidth(columns) {
  return columns
    .map((item) => {
      if (process.env.NODE_ENV === 'development' && !item.hasOwnProperty('width')) {
        console.warn(`注意：【${item.title}】列未设置宽度或最小宽度`)
      }
      return item.width || 0;
    })
    .reduce((a, b) => Number(a) + Number(b), 0)
}

export function getColumns(params) {
  const {onAction} = params;

  return [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      align: 'center',
      valueType: 'input',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      valueEnum: StatusMap,
    },
    {
      title: '备注说明',
      dataIndex: 'type',
      key: 'type',
      width: 150,
      valueType: 'select',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'update_at',
      key: 'update_at',
      width: 160,
      align: 'center',
      search: false,
    },
    {
      title: '更新时间',
      dataIndex: 'update_at',
      key: 'update_at',
      width: 160,
      align: 'center',
      search: false,
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator',
      width: 140,
      align: 'center',
      valueType: 'select',
      search: false,
    },
    {
      ...TABLE_COLUMN_PROPS,
      title: '操作',
      width: 250,
      render: (value, record) => {
        return (
          <Space>
            <a onClick={() => onAction(ActionType.STATUS, record)}>启用</a>
            <a onClick={() => onAction(ActionType.STATUS, record)}>停用</a>
            <a onClick={() => onAction(ActionType.ANALYSIS, record)}>数据</a>

            <a onClick={() => onAction(ActionType.DETAIL, record)}>查看</a>
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
  ];
}