import React, {useRef, useState} from 'react';
import {Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {UserRecord} from './types';
import Create from './Create';
import usePopup from '@/hooks/usePopup';
import styles from './index.module.scss';
import {User} from "services/modules/User";
import {ActionType, createActionFun} from '@/utils';
import {getTableProps} from "./table";
import {ProTable} from "@ant-design/pro-components";

export default () => {
    const actionRef = useRef(null)
    const [total, setTotal] = useState(0)
    const [currentRow, setCurrentRow] = useState(null)
    const {visible, setVisible, show} = usePopup()
    const [action, setAction] = useState<ActionType>(null)

    const onAction = createActionFun({
        [ActionType.CREATE]() {
            show()
            setCurrentRow(null);
        },
        [ActionType.UPDATE](data: UserRecord) {
            show()
            setCurrentRow(data)
        },
        async [ActionType.ENABLE](data: UserRecord) {
            await User.changeStatus({id: data.userId, status: data.status === 1 ? 2 : 1})
            actionRef.current.reload()
        },
    })

    const {columns, scrollX} = getTableProps({onAction})
    const fetchUserList = async (params: Record<string, any>) => {
        const {current, pageSize} = params
        const res = await User.list({
            ...params,
            page_num: current,
            page_size: pageSize,
        })
        setTotal(res.data.length)

        return {
            data: res.data,
            success: true,
        }
    }

    return (
        <div className={styles['user-page']}>
            <ProTable<UserRecord>
                options={false}
                rowKey="userId"
                actionRef={actionRef}
                columns={columns}
                request={fetchUserList}
                scroll={{x: scrollX}}
                search={{labelWidth: 'auto'}}
                toolbar={{
                    title: `系统用户 共【${total}】个`,
                    actions: [
                        <Button
                            key="add"
                            type="primary"
                            icon={<PlusOutlined/>}
                            onClick={() => onAction(ActionType.CREATE)}
                        >
                            创建账号
                        </Button>
                    ],
                }}
            />
            {visible && (
                <Create
                    visible={visible}
                    setVisible={setVisible}
                    data={currentRow}
                    actionRef={actionRef}
                />
            )}
        </div>
    );
};