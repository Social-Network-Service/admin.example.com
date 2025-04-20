import {useRef, useState} from 'react'
import {Button, Typography} from 'antd'
import {ProTable} from '@ant-design/pro-components'

import {ActionType, createActionFun} from '@/utils/action'
import {usePopup} from '@/hooks'
import {PRO_TABLE_DEFAULT_PROPS} from '@/constants'
import {Mark, Template} from "@/services";

import {getColumns, getColumnsWidth} from './table'
import Create from './Create'
import './index.scss'
import {useNavigate} from "react-router-dom";

const {Text} = Typography

export default () => {
  const navigate = useNavigate();
  const actionRef = useRef(null)
  const [total, setTotal] = useState(0)
  const [currentRow, setCurrentRow] = useState(null)
  const {visible, setVisible, show} = usePopup({visible: false})

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
    <div className='mark-image-page'>
      <ProTable
        {...PRO_TABLE_DEFAULT_PROPS}
        actionRef={actionRef}
        scroll={{x: scrollX, y: '100%'}}
        columns={columns}
        request={request}
        toolBarRender={() => [
          <Button type="primary" onClick={() => onAction(ActionType.CREATE)}>
            上传图片
          </Button>,
        ]}
        headerTitle={<Text>图片 共{total}张</Text>}
        tableClassName={'image-table'}
      ></ProTable>

      <Create
        visible={visible}
        setVisible={setVisible}
        title={`上传图片`}
        data={currentRow}
        actionRef={actionRef}
      />
    </div>
  )
}
