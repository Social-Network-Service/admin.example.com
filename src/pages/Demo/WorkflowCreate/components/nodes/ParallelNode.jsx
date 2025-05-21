import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

// 并行节点组件
const ParallelNode = ({ data, isConnectable }) => {
  // 动态生成多个输出口
  const branchCount = data.branchCount || 2;
  const handles = Array.from({ length: branchCount }, (_, i) => i);
  
  return (
    <div className="parallel-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="node-content">
        <div className="node-title">{data.label}</div>
        <div className="node-detail">
          <span>分支数: </span>
          <span>{branchCount}</span>
        </div>
      </div>
      
      {/* 动态生成多个输出点 */}
      {handles.map((index) => {
        const percentage = (index + 1) * (100 / (branchCount + 1));
        return (
          <Handle
            key={`branch-${index}`}
            type="source"
            position={Position.Bottom}
            id={`branch-${index}`}
            style={{ left: `${percentage}%` }}
            isConnectable={isConnectable}
          />
        );
      })}
    </div>
  );
};

export default memo(ParallelNode);
