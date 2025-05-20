import {useState, useContext, useMemo, useEffect} from "react";
import {Tabs, Form, Button, Input, Radio, Space, Divider} from 'antd';
import {PlusOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';
import {usePage} from "../contexts/PageContext";

// 选项编辑器组件
function OptionsEditor({options = [], onChange}) {
  const [items, setItems] = useState(options);

  // 当外部传入的 options 变化时更新内部状态
  useEffect(() => {
    setItems(options);
  }, [options]);

  // 添加选项
  const addItem = () => {
    const newItems = [...items, {label: `选项${items.length + 1}`, value: `${items.length + 1}`}];
    setItems(newItems);
    onChange(newItems);
  };

  // 删除选项
  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    onChange(newItems);
  };

  // 上移选项
  const moveItemUp = (index) => {
    if (index === 0) return; // 如果是第一项，不能上移
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    setItems(newItems);
    onChange(newItems);
  };

  // 下移选项
  const moveItemDown = (index) => {
    if (index === items.length - 1) return; // 如果是最后一项，不能下移
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    setItems(newItems);
    onChange(newItems);
  };

  // 更新选项标签
  const updateItemLabel = (index, value) => {
    const newItems = [...items];
    newItems[index] = {...newItems[index], label: value};
    setItems(newItems);
    onChange(newItems);
  };

  // 更新选项值
  const updateItemValue = (index, value) => {
    const newItems = [...items];
    newItems[index] = {...newItems[index], value: value};
    setItems(newItems);
    onChange(newItems);
  };

  return (
    <div className="options-editor">
      {items.map((item, index) => (
        <Space key={index} style={{display: 'flex', marginBottom: 8}} align="baseline">
          <Form.Item
            style={{marginBottom: 0}}
          >
            <Input
              placeholder="选项文本"
              value={item.label}
              onChange={(e) => updateItemLabel(index, e.target.value)}
            />
          </Form.Item>
          <Form.Item
            style={{marginBottom: 0}}
          >
            <Input
              placeholder="选项值"
              value={item.value}
              onChange={(e) => updateItemValue(index, e.target.value)}
            />
          </Form.Item>
          <Space>
            <ArrowUpOutlined
              onClick={() => moveItemUp(index)}
              style={{
                cursor: index === 0 ? 'not-allowed' : 'pointer',
                opacity: index === 0 ? 0.5 : 1
              }}
            />
            <ArrowDownOutlined
              onClick={() => moveItemDown(index)}
              style={{
                cursor: index === items.length - 1 ? 'not-allowed' : 'pointer',
                opacity: index === items.length - 1 ? 0.5 : 1
              }}
            />
            <DeleteOutlined onClick={() => removeItem(index)}/>
          </Space>
        </Space>
      ))}
      <Form.Item>
        <Button
          type="dashed"
          onClick={addItem}
          icon={<PlusOutlined/>}
          style={{width: '100%'}}
        >
          添加选项
        </Button>
      </Form.Item>
    </div>
  );
}

export default function PropertyBar() {
  const [form] = Form.useForm();
  const {
    formConfig,
    formItemConfig,
    selectIndex,
    setFormConfig,
    setComponentProperty
  } = usePage()

  const selectedFormItem = useMemo(() => {
    return selectIndex !== null ? formItemConfig[selectIndex] : null;
  }, [selectIndex, formItemConfig])

  useEffect(() => {
    if (selectedFormItem) {
      form.setFieldsValue({
        label: selectedFormItem.label,
        name: selectedFormItem.name,
        placeholder: selectedFormItem.placeholder,
        initialValue: selectedFormItem.initialValue,
        options: selectedFormItem.options,
      });
    }
  }, [selectedFormItem, form]);

  const componentPropertyPanel = selectedFormItem
    ? (<Form
      form={form}
      layout='horizontal'
      size={'small'}
    >
      <Form.Item label="字段名称" name="label">
        <Input placeholder="请输入"
               onChange={(event) => {
                 //    console.log('onChange', event.target.value)
                 setComponentProperty('label', event.target.value)
               }}
               onInput={(event) => {
                 //    console.log('onInput', event.target.value)
               }}
        />
      </Form.Item>
      <Form.Item label="字段标识" name="name">
        <Input placeholder="请输入"
               onChange={(event) => {
                 setComponentProperty('name', event.target.value)
               }}
        />
      </Form.Item>
      {(selectedFormItem.tag === 'input' || selectedFormItem.tag === 'textarea' || selectedFormItem.tag === 'select') && (
        <Form.Item label="提示文本" name="placeholder">
          <Input
            placeholder="请输入占位提示文字"
            onChange={(event) => {
              setComponentProperty('placeholder', event.target.value)
            }}
          />
        </Form.Item>
      )}

      <Form.Item label="默认值" name="initialValue">
        <Input
          placeholder="请输入默认值"
          onChange={(event) => {
            setComponentProperty('initialValue', event.target.value)
          }}
        />
      </Form.Item>

      {/* 选项编辑区域 - 仅适用于 select、radio-group 和 checkbox-group */}
      {(selectedFormItem.tag === 'select' || selectedFormItem.tag === 'radio-group' || selectedFormItem.tag === 'checkbox-group') && (
        <>
          <Divider orientation="left">选项设置</Divider>
          <OptionsEditor
            options={selectedFormItem.options || []}
            onChange={(newOptions) => {
              setComponentProperty('options', newOptions);
            }}
          />
        </>
      )}
    </Form>)
    : <span style={{color: 'rgba(150,150,150,0.5)'}}>请选择表单项</span>

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
          initialValues={{
            layout: formConfig.layout,
            labelAlign: formConfig.labelAlign,
          }}
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
    // console.log(key);
  };

  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
  )
}