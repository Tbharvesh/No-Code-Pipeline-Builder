
import { BaseNode } from './BaseNode';
import { TextInput, Select, Text, Stack, Group, Badge } from '@mantine/core';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      inputHandles={[
        { id: `${id}-system`, style: { top: '33%' } },
        { id: `${id}-prompt`, style: { top: '66%' } },
      ]}
      outputHandles={[{ id: `${id}-response` }]}
    >
      <Text
  size="sm"
  style={{
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    backdropFilter: 'blur(10px)',
    maxWidth: '100%',
  }}
>
  This is a LLM message.
</Text>
      
    </BaseNode>
  );
};
