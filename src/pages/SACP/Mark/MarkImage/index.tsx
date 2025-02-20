import {useRef, useState} from 'react'
import {Button, Typography} from 'antd'
import {ProTable} from '@ant-design/pro-components'

import {ActionType, createActionFun} from '@/utils/action'
import usePopup from '@/hooks/usePopup'
import {PRO_TABLE_DEFAULT_PROPS} from '@/constants'
import {Mark} from "@/services";

import {getColumns, getColumnsWidth} from './table'
import CreateModal from './Create'
import './index.scss'

const {Text} = Typography

export default () => {
    const actionRef = useRef(null)
    const [total, setTotal] = useState(0)
    const [currentRow, setCurrentRow] = useState(null)
    const {visible, setVisible, show} = usePopup({visible: false})

    const onAction = createActionFun({
        [ActionType.CREATE]() {
            setCurrentRow(null)
            show()
        },
        async [ActionType.DELETE](data: any) {
            actionRef.current.reload()
        },
    })
    const columns = getColumns({onAction})
    const scrollX = getColumnsWidth(columns)
    const request = async (params: any) => {
        const result = await Mark.getImageList(params)
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

            <CreateModal
                visible={visible}
                setVisible={setVisible}
                title={`上传图片`}
                data={currentRow}
                actionRef={actionRef}
            />
        </div>
    )
}
