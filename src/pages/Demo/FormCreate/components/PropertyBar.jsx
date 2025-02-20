import {useState} from "react";
import {Tabs, Form, Button, Input, Radio} from 'antd';

export default () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const onFormLayoutChange = ({layout}) => {
    setFormLayout(layout);
  };

  const items = [
    {
      key: '1',
      label: '表单属性',
      children: (
        <Form
          layout={formLayout}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
          onValuesChange={onFormLayoutChange}
          style={{
            maxWidth: formLayout === 'inline' ? 'none' : 600,
          }}
        >
          <Form.Item label="Form Layout" name="layout">
            <Radio.Group value={formLayout}>
              <Radio.Button value="horizontal">Horizontal</Radio.Button>
              <Radio.Button value="vertical">Vertical</Radio.Button>
              <Radio.Button value="inline">Inline</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Field A">
            <Input placeholder="input placeholder"/>
          </Form.Item>
          <Form.Item label="Field B">
            <Input placeholder="input placeholder"/>
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