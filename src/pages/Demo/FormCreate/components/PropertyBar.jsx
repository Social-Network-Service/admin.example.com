import { useState, useContext, useMemo, useEffect } from "react";
import { Tabs, Form, Button, Input, Radio } from 'antd';
import { usePage } from "../contexts/PageContext";

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
        </Form>)
        : <span style={{ color: 'rgba(150,150,150,0.5)' }}>请选择表单项</span>

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
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    )
}