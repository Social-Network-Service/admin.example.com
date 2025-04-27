import {useRef, useState} from 'react'
import {useNavigate} from "react-router-dom"
import {Button, Typography} from 'antd'
import {ProTable} from '@ant-design/pro-components'

import {ActionType, createActionFun} from '@/utils'
import {PRO_TABLE_DEFAULT_PROPS} from '@/constants'
import {Template} from "@/services"

import {getColumns, getColumnsWidth} from './table'

const {Text} = Typography

export default () => {
  const navigate = useNavigate();
  const actionRef = useRef(null)
  const [total, setTotal] = useState(0)

  const onAction = createActionFun({
    [ActionType.CREATE]() {
      setCurrentRow(null)
      show()
    },
    async [ActionType.DELETE](data) {
      actionRef.current.reload()
    },
    [ActionType.UPDATE](data) {
      setCurrentRow(data)
      show()
    },
    [ActionType.STATUS](data) {

    },
    [ActionType.ANALYSIS](data) {
      navigate('/Demo/CRUD/Analysis')
    },
  })
  const columns = getColumns({onAction})
  const scrollX = getColumnsWidth(columns)
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
        <Button type="primary" onClick={() => onAction(ActionType.CREATE)}>
          创建
        </Button>,
      ]}
      headerTitle={<Text>图片 共{total}张</Text>}
      tableClassName={'image-table'}
    />
  )
}
