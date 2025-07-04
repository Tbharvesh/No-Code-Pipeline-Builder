// LoggerNode.jsx
import { BaseNode } from './BaseNode';
import { Text } from '@mantine/core';

export const LoggerNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Logger"
      inputHandles={[{ id: `${id}-in` }]}
      outputHandles={[{ id: `${id}-out` }]}
    >
        <Text
                            size="sm"
                            styles={{
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              borderColor: 'rgba(255, 255, 255, 0.3)',
                              color: 'white',
                              backdropFilter: 'blur(10px)',
                              '&:focus': {
                                borderColor: '#00d4ff',
                                boxShadow: '0 0 0 2px rgba(0, 212, 255, 0.2)'
                              },
                              '&::placeholder': {
                                color: 'rgba(255, 255, 255, 0.5)'
                              }
                            }}
                        >
                            Logs data here.
                        </Text>
        
      
    </BaseNode>
  );
};
