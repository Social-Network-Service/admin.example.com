import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

// 任务节点组件
const TaskNode = ({ data, isConnectable }) => {
  return (
    <div className="task-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="node-content">
        <div className="node-title">{data.label}</div>
        {data.assignee && (
          <div className="node-detail">
            <span>执行人: </span>
            <span>{data.assignee}</span>
          </div>
        )}
        {data.form && (
          <div className="node-detail">
            <span>表单: </span>
            <span>{data.form}</span>
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(TaskNode);
