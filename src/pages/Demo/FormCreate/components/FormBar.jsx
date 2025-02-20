import {useState, useMemo, useEffect} from 'react';
import {Form, Input} from "antd";
import {ProForm, ProFormText, ProFormTextArea} from "@ant-design/pro-components"

export default () => {
  const [formItemList, setFormItemList] = useState([])

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
      default:
        return <span key={index}>未知tag={formItem.tag}</span>
        break;
    }
  })

  return (
    <div className='form-bar'>
      <ProForm>
        {formItems}
      </ProForm>
    </div>
  )
}