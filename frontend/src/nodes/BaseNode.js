// // BaseNode.jsx
import { Card, Text, Box, Group } from '@mantine/core';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  description,
  icon,
  inputHandles = [],
  outputHandles = [],
  children,
  selected = false,
}) => {
  return (
    <Card
      shadow="lg"
      padding="lg"
      radius="xl"
      style={{
        minWidth: 260,
        minHeight: 120,
        position: 'relative',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: selected ? '2px solid #00d4ff' : '2px solid transparent',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        transform: selected ? 'scale(1.02)' : 'scale(1)',
        boxShadow: selected 
          ? '0 12px 40px rgba(102, 126, 234, 0.4)' 
          : '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.transform = 'scale(1.01)';
          e.currentTarget.style.boxShadow = '0 10px 36px rgba(102, 126, 234, 0.3)';
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        }
      }}
    >
      {/* Header Section */}
      <Box
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          margin: '-16px -16px 16px -16px',
          padding: '12px 16px',
          borderRadius: '16px 16px 0 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Group gap="sm" align="center">
          {icon && (
            <Box style={{ fontSize: '20px' }}>
              {icon}
            </Box>
          )}
          <Text 
            fw={700} 
            size="lg" 
            c="white" 
            style={{ 
              letterSpacing: '0.5px',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
            }}
          >
            {title}
          </Text>
        </Group>
      </Box>

      {/* Description */}
      {description && (
        <Text 
          size="sm" 
          c="rgba(255, 255, 255, 0.8)" 
          mb="md"
          style={{ 
            fontWeight: 500,
            lineHeight: 1.4
          }}
        >
          {description}
        </Text>
      )}

      {/* Input Handles */}
      {inputHandles.map((handle, i) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={{
            top: `${((i + 1) * 100) / (inputHandles.length + 1)}%`,
            background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
            width: 14,
            height: 14,
            borderRadius: '50%',
            border: '3px solid white',
            left: -7,
            boxShadow: '0 2px 8px rgba(0, 212, 255, 0.4)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.2)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 212, 255, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 2px 8px rgba(0, 212, 255, 0.4)';
          }}
        />
      ))}

      {/* Content */}
      <Box>{children}</Box>

      {/* Output Handles */}
      {outputHandles.map((handle, i) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={{
            top: `${((i + 1) * 100) / (outputHandles.length + 1)}%`,
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
            width: 14,
            height: 14,
            borderRadius: '50%',
            border: '3px solid white',
            right: -7,
            boxShadow: '0 2px 8px rgba(255, 107, 107, 0.4)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.2)';
            e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 2px 8px rgba(255, 107, 107, 0.4)';
          }}
        />
      ))}
    </Card>
  );
};