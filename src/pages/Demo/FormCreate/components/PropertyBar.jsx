import {useState, useContext} from "react";
import {Tabs, Form, Button, Input, Radio} from 'antd';
import {FormContext} from "../contexts/FormContext";

export default () => {
  const [form] = Form.useForm();
  const formContext = useContext(FormContext)

  const initialValues = {
    layout: formContext.state.layout,
    labelAlign: formContext.state.labelAlign,
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
        >
          <Form.Item label="表单布局" name="layout">
            <Radio.Group onChange={(event) => {
              formContext.setState({
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
              formContext.setState({
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