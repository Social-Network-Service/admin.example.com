import {useState, useContext} from "react";
import {Tabs, Form, Button, Input, Radio} from 'antd';
import {GlobalDataContext} from "../contexts/GlobalDataContext";

export default () => {
  const [form] = Form.useForm();
  const {state, setFormConfig} = useContext(GlobalDataContext)

  const initialValues = {
    layout: state.formConfig.layout,
    labelAlign: state.formConfig.labelAlign,
  }

  const items = [
    {
      key: '1',
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
    {
      key: '2',
      label: '组件属性',
      children: 'Content of Tab Pane 2',
    }
  ];
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
  )
}