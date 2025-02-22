import {useState, useMemo, useEffect, useContext} from 'react';
import {Form, Input} from "antd";
import {ProForm, ProFormText, ProFormTextArea} from "@ant-design/pro-components"
import {DeleteOutlined} from "@ant-design/icons";
import {GlobalDataContext} from "../contexts/GlobalDataContext";

export default () => {
  const {state: {formConfig, formItemConfig}, deleteFormItem} = useContext(GlobalDataContext)

  const formItemList = formItemConfig.map((formItem, index) => {
    let formItemComponent = null;
    switch (formItem.tag) {
      case 'input':
        formItemComponent = <ProFormText label={`字段${index + 1}`} key={index}/>
        break;
      case 'textarea':
        formItemComponent = <ProFormTextArea label={`字段${index + 1}`} key={index}/>
        break;
      case 'input_password':
        formItemComponent = <ProFormText.Password label={`字段${index + 1}`} key={index}/>
        break;
      default:
        formItemComponent = <span key={index}>未知tag={formItem.tag}</span>
        break;
    }
    return <div className={'form-item-wrapper'} key={index}>
      {formItemComponent}
      <DeleteOutlined onClick={(event) => {
        event.stopPropagation()
        deleteFormItem(index)
      }}/>
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