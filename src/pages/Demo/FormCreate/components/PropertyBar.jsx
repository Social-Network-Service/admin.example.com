import {useState, useContext, useMemo} from "react";
import {Tabs, Form, Button, Input, Radio} from 'antd';
import {GlobalDataContext} from "../contexts/GlobalDataContext";

export default () => {
  const [form] = Form.useForm();
  const {
    state: {
      formConfig,
      formItemConfig,
      selectIndex
    },
    setFormConfig,
    setComponentProperty,
  } = useContext(GlobalDataContext)

  const selectedFormItem = useMemo(() => {
    return selectIndex !== null ? formItemConfig[selectIndex] : null;
  }, [selectIndex])

  const initialValues = {
    layout: formConfig.layout,
    labelAlign: formConfig.labelAlign,
  }

  const initialValues2 = {
    label: selectedFormItem?.label,
    name: selectedFormItem?.name,
  }

  const componentPropertyPanel = selectedFormItem
    ? (<Form
      initialValues={initialValues2}
      layout='horizontal'
      size={'small'}
    >
      <Form.Item label="标签文本" name="label">
        <Input placeholder="请输入"
               onChange={(event) => {
                 console.log('onChange', event.target.value)
                 setComponentProperty('label', event.target.value)
               }}
               onInput={(event) => {
                 console.log('onInput', event.target.value)
               }}
        />
      </Form.Item>
      <Form.Item label="字段名" name="name">
        <Input placeholder="请输入"
               onChange={(event) => {
                 setComponentProperty('name', event.target.value)
               }}
        />
      </Form.Item>
    </Form>)
    : <span style={{color: 'rgba(150,150,150,0.5)'}}>请选择表单录入项</span>

  const items = [
    {
      key: '1',
      label: '组件属性',
      children: (
        componentPropertyPanel
      ),
    },
    {
      key: '2',
      label: '表单属性',
      children: (
        <Form
          layout='horizontal'
          form={form}
          initialValues={initialValues}
          size={'small'}
        >
          <Form.Item label="表单布局" name="layout">
            <Radio.Group onChange={(event) => {
              setFormConfig({
                layout: event.target.value
              })
            }}>
              <Radio.Button value="horizontal">Horizontal</Radio.Button>
              <Radio.Button value="vertical">Vertical</Radio.Button>
              <Radio.Button value="inline">Inline</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="标签文本对齐方式" name="labelAlign">
            <Radio.Group onChange={(event) => {
              setFormConfig({
                labelAlign: event.target.value
              })
            }}>
              <Radio.Button value="left">left</Radio.Button>
              <Radio.Button value="right">right</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      ),
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
  )
}