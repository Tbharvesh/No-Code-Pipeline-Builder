// LoggerNode.jsx
import { BaseNode } from './BaseNode';

export const LoggerNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Logger"
      inputHandles={[{ id: `${id}-in` }]}
    >
      <span>Logs data here.</span>
    </BaseNode>
  );
};
