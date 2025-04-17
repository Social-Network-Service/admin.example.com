import {useState, useMemo, useEffect, useContext} from 'react';
import {Form, Input} from "antd";
import {ProForm, ProFormText, ProFormTextArea} from "@ant-design/pro-components"
import {DeleteOutlined} from "@ant-design/icons";
import {GlobalDataContext} from "../contexts/GlobalDataContext";

export default () => {
    const {
        state: {formConfig, formItemConfig, selectIndex},
        deleteFormItem,
        setSelectIndex
    } = useContext(GlobalDataContext)

    const formItemList = formItemConfig.map((formItem, index) => {
        const {tag, label, name} = formItem
        let formItemComponent = null;
        switch (tag) {
            case 'input':
                formItemComponent = <ProFormText
                    key={index}
                    label={label}
                    name={name}
                />
                break;
            case 'textarea':
                formItemComponent = <ProFormTextArea
                    key={index}
                    label={label}
                    name={name}
                />
                break;
            case 'input_password':
                formItemComponent = <ProFormText.Password
                    key={index}
                    label={label}
                    name={name}
                />
                break;
            default:
                formItemComponent = <span key={index}>未知tag={formItem.tag}</span>
                break;
        }
        return <div
            className={['form-item-wrapper', selectIndex === index ? 'selected' : null].filter(item => item).join(' ')}
            key={index}>
            <div className='hotspot' onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                setSelectIndex(
                    selectIndex !== index || selectIndex === null
                        ? index
                        : null
                );
            }}/>
            {formItemComponent}
            <div className={'form-item-control-wrapper'}>
                <DeleteOutlined onClick={(event) => {
                    event.stopPropagation()
                    deleteFormItem(index)
                }}/>
            </div>
        </div>
    })

    return (
        <div className='form-bar'>
            <ProForm
                layout={formConfig.layout}
                labelAlign={formConfig.labelAlign}
                submitter={false}
                autoFocusFirstInput={false}
                labelCol={{style: {width: '120px'}}}
            >
                {formItemList}
            </ProForm>
        </div>
    )
}