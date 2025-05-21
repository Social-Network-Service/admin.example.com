import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card, Button, Space, Select, Modal, Form, Input, message } from 'antd';
import './FlowDesigner.scss';

// // 自定义节点类型
import TaskNode from './nodes/TaskNode';
import ConditionNode from './nodes/ConditionNode';
import ParallelNode from './nodes/ParallelNode';
import RobotNode from './nodes/RobotNode';

// // 节点类型映射
const nodeTypes = {
  taskNode: TaskNode,
  conditionNode: ConditionNode,
  parallelNode: ParallelNode,
  robotNode: RobotNode,
};

// // 初始节点
const initialNodes = [
  {
    id: 'start',
    type: 'input',
    data: { label: '开始' },
    position: { x: 250, y: 0 },
    style: {
      background: '#d5f5d5',
      color: '#333',
      border: '1px solid #277c2c',
      borderRadius: '3px',
      width: 150,
    },
  },
];

// 初始连线
const initialEdges = [];

/**
 * 流程设计器组件
 * 支持条件分支、并行分支、机器人节点、任务节点
 */
const FlowDesigner = ({ value, onChange }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nodeForm] = Form.useForm();
  const [nextNodeId, setNextNodeId] = useState(1);

  // // 外部传入的值变化时更新设计器
  useEffect(() => {
    if (value && value.nodes && value.edges) {
      setNodes(value.nodes);
      setEdges(value.edges);
    }
  }, [value, setNodes, setEdges]);

  // // 连接节点的回调
  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { strokeWidth: 2 },
      };
      const newEdges = addEdge(newEdge, edges);
      setEdges(newEdges);
      onChange?.({ nodes, edges: newEdges });
    },
    [edges, nodes, onChange, setEdges]
  );

  // // 添加节点
  const addNode = (type) => {
    const nodeId = `node_${nextNodeId}`;
    setNextNodeId(nextNodeId + 1);

    let newNode = {
      id: nodeId,
      type,
      position: { x: 250, y: 100 + nodes.length * 80 },
      data: { label: `${getNodeTypeLabel(type)} ${nextNodeId}` },
    };

    // // 根据节点类型设置样式和属性
    switch(type) {
      case 'conditionNode':
        newNode.style = {
          background: '#fff9e6',
          color: '#333',
          border: '1px solid #ffc53d',
          borderRadius: '3px',
          width: 180,
        };
        newNode.data = { ...newNode.data, conditions: [] };
        break;
      case 'parallelNode':
        newNode.style = {
          background: '#e6f7ff',
          color: '#333',
          border: '1px solid #1890ff',
          borderRadius: '3px',
          width: 180,
        };
        newNode.data = { ...newNode.data, branches: [], branchCount: 2 };
        break;
      case 'robotNode':
        newNode.style = {
          background: '#f0f5ff',
          color: '#333',
          border: '1px solid #597ef7',
          borderRadius: '3px',
          width: 180,
        };
        newNode.data = { ...newNode.data, script: '' };
        break;
      case 'taskNode':
      default:
        newNode.style = {
          background: '#f6ffed',
          color: '#333',
          border: '1px solid #52c41a',
          borderRadius: '3px',
          width: 180,
        };
        newNode.data = { ...newNode.data, assignee: '', form: '' };
        break;
    }

    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
    onChange?.({ nodes: newNodes, edges });
  };

  // // 节点点击事件
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    nodeForm.setFieldsValue(node.data);
    setIsModalVisible(true);
  };

  // // 更新节点数据
  const updateNodeData = (values) => {
    if (!selectedNode) return;

    const updatedNodes = nodes.map((node) => {
      if (node.id === selectedNode.id) {
        return {
          ...node,
          data: { ...node.data, ...values },
        };
      }
      return node;
    });

    setNodes(updatedNodes);
    setIsModalVisible(false);
    onChange?.({ nodes: updatedNodes, edges });
    message.success('节点配置已更新');
  };

  // // 渲染节点配置表单
  const renderNodeConfigForm = () => {
    if (!selectedNode) return null;

    switch (selectedNode.type) {
      case 'conditionNode':
        return (
          <>
            <Form.Item name="label" label="节点名称" rules={[{ required: true }]}>
              <Input placeholder="请输入条件节点名称" />
            </Form.Item>
            <Form.Item name="condition" label="条件表达式" rules={[{ required: true }]}>
              <Input.TextArea placeholder="请输入条件表达式，例如：amount > 1000" />
            </Form.Item>
          </>
        );
      case 'parallelNode':
        return (
          <>
            <Form.Item name="label" label="节点名称" rules={[{ required: true }]}>
              <Input placeholder="请输入并行节点名称" />
            </Form.Item>
            <Form.Item name="branchCount" label="分支数量" rules={[{ required: true }]}>
              <Input type="number" min={2} placeholder="请输入分支数量" />
            </Form.Item>
          </>
        );
      case 'robotNode':
        return (
          <>
            <Form.Item name="label" label="节点名称" rules={[{ required: true }]}>
              <Input placeholder="请输入机器人节点名称" />
            </Form.Item>
            <Form.Item name="script" label="脚本" rules={[{ required: true }]}>
              <Input.TextArea placeholder="请输入机器人执行脚本" rows={4} />
            </Form.Item>
          </>
        );
      case 'taskNode':
        return (
          <>
            <Form.Item name="label" label="节点名称" rules={[{ required: true }]}>
              <Input placeholder="请输入任务节点名称" />
            </Form.Item>
            <Form.Item name="assignee" label="执行人" rules={[{ required: true }]}>
              <Input placeholder="请输入执行人或角色" />
            </Form.Item>
            <Form.Item name="form" label="表单" rules={[{ required: true }]}>
              <Select placeholder="请选择关联表单">
                <Select.Option value="form1">表单1</Select.Option>
                <Select.Option value="form2">表单2</Select.Option>
              </Select>
            </Form.Item>
          </>
        );
      default:
        return null;
    }
  };

  // // 获取节点类型标签
  const getNodeTypeLabel = (type) => {
    switch(type) {
      case 'conditionNode': return '条件';
      case 'parallelNode': return '并行';
      case 'robotNode': return '机器人';
      case 'taskNode': return '任务';
      default: return '节点';
    }
  };

  return (
    <div className="flow-designer-container">
      <Card title="流程设计器" className="flow-designer-card">
        <div className="toolbar">
          <Space>
            <Button onClick={() => addNode('taskNode')}>添加任务节点</Button>
            <Button onClick={() => addNode('conditionNode')}>添加条件节点</Button>
            <Button onClick={() => addNode('parallelNode')}>添加并行节点</Button>
            <Button onClick={() => addNode('robotNode')}>添加机器人节点</Button>
          </Space>
        </div>
        <div className="reactflow-wrapper">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            style={{ height: 500 }}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </Card>

      <Modal
        title="u8282u70b9u914du7f6e"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => nodeForm.submit()}
      >
        <Form
          form={nodeForm}
          layout="vertical"
          onFinish={updateNodeData}
        >
          {renderNodeConfigForm()}
        </Form>
      </Modal>
    </div>
  );
};

export default FlowDesigner;
