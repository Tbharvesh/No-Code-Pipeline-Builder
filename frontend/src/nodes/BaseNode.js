// BaseNode.jsx
import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  inputHandles = [],
  outputHandles = [],
  children,
}) => {
  return (
    <div style={{ width: 200, height: 80, border: '1px solid black', padding: 5 }}>
      {/* Input Handles (Left Side) */}
      {inputHandles.map((handle, index) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={handle.style || { top: `${(index + 1) * 25}%` }}
        />
      ))}

      {/* Node Title */}
      <div><strong>{title}</strong></div>

      {/* Node Body Content */}
      <div>{children}</div>

      {/* Output Handles (Right Side) */}
      {outputHandles.map((handle, index) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={handle.style || { top: `${(index + 1) * 25}%` }}
        />
      ))}
    </div>
  );
};
