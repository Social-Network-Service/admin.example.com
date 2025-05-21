import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Steps, Button, message, Space } from 'antd';
import './index.scss';

const { Step } = Steps;

/**
 * 流程创建页面
 * 用于创建和配置工作流程
 */
export default function WorkflowCreate() {
  const [current, setCurrent] = useState(0);
  const [workflowData, setWorkflowData] = useState({
    basicInfo: {},
    nodeConfig: [],
    formConfig: {}
  });

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
    setCurrent(current + 1);
  };

  // 上一步
  const prev = () => {
    setCurrent(current - 1);
  };

  // 保存流程
  const saveWorkflow = () => {
    message.success('流程创建成功！');
    // 这里可以添加保存流程的逻辑
  };

  // 渲染当前步骤的内容
  const renderStepContent = () => {
    const step = steps[current];
    return (
      <div className="step-content">
        <h3>{step.title}</h3>
        <p>{step.content}</p>
        {/* 这里可以根据不同步骤渲染不同的表单或配置界面 */}
        {current === 0 && (
          <div>基本信息表单</div>
        )}
        {current === 1 && (
          <div>节点配置界面</div>
        )}
        {current === 2 && (
          <div>
            <h4>流程创建完成</h4>
            <p>您已成功配置工作流程，点击下方按钮保存流程。</p>
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
