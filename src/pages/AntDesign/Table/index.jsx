import React, {useCallback} from 'react';
import {Button, Popconfirm, Table} from 'antd';

const TableDemo = ({}) => {
  let products = [
    {id: '1', name: 'Umi'},
    {id: '2', name: 'Ant Design'},
    {id: '3', name: 'Ant Design Pro'},
    {id: '4', name: 'Dva'},
  ];

  const onDelete = useCallback((id) => {
    console.log(`delete id=${id}`)
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      render(text, record) {
        return (
          <Popconfirm title="Are you sure you want to delete it?" onConfirm={() => onDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];
  return <Table rowKey="id" dataSource={products} columns={columns}/>;
};

export default TableDemo;