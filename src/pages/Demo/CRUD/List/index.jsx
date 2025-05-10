import {useRef, useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import {Button, Typography} from 'antd'
import {ProTable} from '@ant-design/pro-components'

import {ActionType, createActionFun} from '@/utils'
import {PRO_TABLE_DEFAULT_PROPS} from '@/constants'
import {Template} from "@/services"

import {useTable} from './table'
import {usePageDispatch} from "../PageContext";

const {Text} = Typography

export default function List() {
  const [total, setTotal] = useState(0)
  const {actionRef, columns, scrollX} = useTable()
  const dispatch = usePageDispatch()

  const request = async (params) => {
    const result = await Template.templateList(params)
    const {success, data, total_num: total} = result

    setTotal(total)

    return {
      data,
      success,
      total,
    }
  }


  return (
    <ProTable
      {...PRO_TABLE_DEFAULT_PROPS}
      actionRef={actionRef}
      scroll={{x: scrollX, y: '100%'}}
      columns={columns}
      request={request}
      toolBarRender={() => [
        <Button type="primary" onClick={() => {
          dispatch({
            type: 'create_show',
          })
        }}>
          创建
        </Button>,
      ]}
      headerTitle={<Text>图片 共{total}张</Text>}
      tableClassName={'image-table'}
    />
  )
}
