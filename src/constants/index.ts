import {ProColumnType} from '@ant-design/pro-components'
import {OptionConfig} from '@ant-design/pro-table/es/components/ToolBar'

/**
 * ProTable 组件的默认属性
 * @example
 * <ProTable {...PRO_TABLE_DEFAULT_PROPS}>
 * */
export const PRO_TABLE_DEFAULT_PROPS: {
    options: OptionConfig | false
    [key: string]: any
} = {
    rowKey: 'id',
    options: false,
    cardBordered: true,
    headerTitle: ' ',
    // search: {
    //   defaultCollapsed: false,
    // },
}

/**
 * ProTable 组件操作列的默认属性
 * */
export const TABLE_COLUMN_PROPS: ProColumnType<any, any> = {
    key: 'option',
    dataIndex: 'option',
    valueType: 'option',
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    title: '操作',
}