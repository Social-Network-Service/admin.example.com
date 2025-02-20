import {useNavigate} from 'react-router-dom';
import {ProTable} from '@ant-design/pro-components'

import {ActionType, createActionFun} from '@/utils/action'
import {Message} from '@/services'
import {PRO_TABLE_DEFAULT_PROPS} from '@/constants'

import {getColumns, getColumnsWidth} from './table'

export default () => {
    const navigate = useNavigate();
    const onAction = createActionFun({
        [ActionType.CHECK](data: any) {
            navigate(`/SACP/Mark/MarkRecord?id=${data.id}`)
        }
    })
    const columns = getColumns({onAction})
    const scrollX = getColumnsWidth(columns)
    const request = async (params: any) => {
        const result = await Message.templateList(params)
        const {success, data, total_num: total} = result

        return {
            data,
            success,
            total,
        }
    }

    return (
        <ProTable
            {...PRO_TABLE_DEFAULT_PROPS}
            scroll={{x: scrollX}}
            columns={columns}
            request={request}
            pagination={false}
        ></ProTable>
    )
}
