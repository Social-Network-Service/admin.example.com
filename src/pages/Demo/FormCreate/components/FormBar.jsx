import {useState, useMemo, useEffect, useContext} from 'react';
import {Form, Input} from "antd";
import {ProForm, ProFormText, ProFormTextArea} from "@ant-design/pro-components"
import {FormContext} from "../contexts/FormContext";

export default () => {
  const [formItemList, setFormItemList] = useState([{
    tag: 'input',
  }])
  const formContext = useContext(FormContext)

  useEffect(() => {
    const listener = (event) => {
      const {detail} = event;
      // console.log(detail)
      setFormItemList((formItemList) => {
        return formItemList.concat({tag: detail.__config__.tag})
      })
    }

    window.addEventListener('add_component', listener)

    return () => {
      window.removeEventListener('add_component', listener)
    }
  }, [])

  const formItems = formItemList.map((formItem, index) => {
    switch (formItem.tag) {
      case 'input':
        return <ProFormText label={`字段${index + 1}`} key={index}/>
        break;
      case 'textarea':
        return <ProFormTextArea label={`字段${index + 1}`} key={index}/>
        break;
      case 'input_password':
        return <ProFormText.Password label={`字段${index + 1}`} key={index}/>
        break;
      default:
        return <span key={index}>未知tag={formItem.tag}</span>
        break;
    }
  })

  return (
    <div className='form-bar'>
      <ProForm
        layout={formContext.state.layout}
        labelAlign={formContext.state.labelAlign}
        submitter={false}
        autoFocusFirstInput={false}
        labelCol={{ style: { width: '120px' } }}
      >
        {formItems}
      </ProForm>
    </div>
  )
}