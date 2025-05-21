import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

// 条件节点组件
const ConditionNode = ({ data, isConnectable }) => {
  return (
    <div className="condition-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="node-content">
        <div className="node-title">{data.label}</div>
        {data.condition && (
          <div className="node-detail">
            <span>条件: </span>
            <span>{data.condition}</span>
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="true"
        style={{ left: '30%' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="false"
        style={{ left: '70%' }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(ConditionNode);
