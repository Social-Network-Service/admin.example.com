import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Steps, Button, message, Space, Form, Input } from 'antd';
import FlowDesigner from './components/FlowDesigner';
import './index.scss';

const { Step } = Steps;

/**
 * 流程创建页面
 * 用于创建和配置工作流程
 */
export default function WorkflowCreate() {
  const [current, setCurrent] = useState(1);
  const [workflowData, setWorkflowData] = useState({
    basicInfo: {
      name: '',
      description: '',
      category: ''
    },
    nodeConfig: {
      nodes: [],
      edges: []
    }
  });
  
  const [basicForm] = Form.useForm();

  // 步骤定义
  const steps = [
    {
      title: '基本信息',
      content: '流程基本信息配置',
    },
    {
      title: '节点配置',
      content: '配置流程节点和流转规则',
    },
    {
      title: '完成',
      content: '创建完成',
    },
  ];

  // 下一步
  const next = () => {
    if (current === 0) {
      basicForm.validateFields().then(values => {
        setWorkflowData(prev => ({
          ...prev,
          basicInfo: values
        }));
        setCurrent(current + 1);
      }).catch(err => {
        console.error('表单验证失败:', err);
      });
    } else {
      setCurrent(current + 1);
    }
  };

  // 上一步
  const prev = () => {
    setCurrent(current - 1);
  };

  // 保存流程
  const saveWorkflow = () => {
    console.log('保存的工作流数据:', workflowData);
    message.success('流程创建成功！');
    // 这里可以添加保存流程的逻辑，例如发送到后端API
    // saveToBackend(workflowData);
  };

  // 更新节点配置
  const handleNodeConfigChange = (nodeConfig) => {
    setWorkflowData(prev => ({
      ...prev,
      nodeConfig
    }));
  };

  // 渲染当前步骤的内容
  const renderStepContent = () => {
    return (
      <div className="step-content">
        {current === 0 && (
          <Card className="form-card">
            <Form
              form={basicForm}
              layout="vertical"
              initialValues={workflowData.basicInfo}
            >
              <Form.Item
                name="name"
                label="流程名称"
                rules={[{ required: true, message: '请输入流程名称' }]}
              >
                <Input placeholder="请输入流程名称" />
              </Form.Item>
              <Form.Item
                name="category"
                label="流程分类"
                rules={[{ required: true, message: '请输入流程分类' }]}
              >
                <Input placeholder="请输入流程分类" />
              </Form.Item>
              <Form.Item
                name="description"
                label="流程描述"
              >
                <Input.TextArea rows={4} placeholder="请输入流程描述" />
              </Form.Item>
            </Form>
          </Card>
        )}
        {current === 1 && (
          <div className="flow-designer-wrapper">
            <FlowDesigner 
              value={workflowData.nodeConfig} 
              onChange={handleNodeConfigChange} 
            />
          </div>
        )}
        {current === 2 && (
          <div className="completion-step">
            <Card className="summary-card">
              <h4>流程创建完成</h4>
              <p>您已成功配置工作流程，请检查以下信息：</p>
              <div className="summary-content">
                <div className="summary-item">
                  <span className="label">流程名称：</span>
                  <span className="value">{workflowData.basicInfo.name}</span>
                </div>
                <div className="summary-item">
                  <span className="label">流程分类：</span>
                  <span className="value">{workflowData.basicInfo.category}</span>
                </div>
                <div className="summary-item">
                  <span className="label">节点数量：</span>
                  <span className="value">{workflowData.nodeConfig.nodes?.length || 0}</span>
                </div>
                <div className="summary-item">
                  <span className="label">连线数量：</span>
                  <span className="value">{workflowData.nodeConfig.edges?.length || 0}</span>
                </div>
              </div>
              <p>确认无误后，点击下方"保存流程"按钮完成创建。</p>
            </Card>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">
        {renderStepContent()}
      </div>
      <div className="steps-action">
        <Space>
          {current > 0 && (
            <Button onClick={() => prev()}>
              上一步
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={saveWorkflow}>
              保存流程
            </Button>
          )}
        </Space>
      </div>
    </Card>
  );
}
