import {Popconfirm, Space} from 'antd';
import {ActionType} from '@/utils/action';
import {TABLE_COLUMN_PROPS} from "@/constants";

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
      title: '图片名称',
      dataIndex: 'name',
      key: 'name',
      width: 260,
      align: 'center',
      valueType: 'input',
    },
    {
      title: '总标记数量',
      dataIndex: 'type',
      key: 'type',
      width: 200,
      valueType: 'select',
      hideInSearch: true,
    },
    {
      title: '备注说明',
      dataIndex: 'type',
      key: 'type',
      width: 200,
      valueType: 'select',
      hideInSearch: true,
    },
    {
      title: '最新修改时间',
      dataIndex: 'update_time',
      key: 'update_time',
      width: 160,
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作人员',
      dataIndex: 'operator',
      key: 'operator',
      width: 140,
      align: 'center',
      valueType: 'select',
    },
    {
      ...TABLE_COLUMN_PROPS,
      title: '操作',
      width: 200,
      render: (value, record) => {
        return (
          <Space>
            <a onClick={() => onAction(ActionType.UPDATE, record)}>启用</a>
            <a onClick={() => onAction(ActionType.UPDATE, record)}>停用</a>
            <a onClick={() => onAction(ActionType.UPDATE, record)}>数据</a>

            <a onClick={() => onAction(ActionType.UPDATE, record)}>查看</a>
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