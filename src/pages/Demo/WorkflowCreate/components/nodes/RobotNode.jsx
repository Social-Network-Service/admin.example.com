import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

// 机器人节点组件
const RobotNode = ({ data, isConnectable }) => {
  return (
    <div className="robot-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="node-content">
        <div className="node-title">{data.label}</div>
        {data.script && (
          <div className="node-detail">
            <span>脚本: </span>
            <span className="script-preview">{data.script.length > 30 ? data.script.substring(0, 30) + '...' : data.script}</span>
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

export default memo(RobotNode);
