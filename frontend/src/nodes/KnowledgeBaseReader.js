import { BaseNode } from './BaseNode';
import { TextInput , Select ,Stack , Text} from '@mantine/core';
import { useState } from 'react';

export const KnowledgeBaseReader = ({ id }) => {
  const [currQuery, setCurrQuery] = useState('');
  const [currKb, setCurrKb] = useState('');

  return (
    <BaseNode
      id={id}
      title="KnowledgeBaseReader"
      inputHandles={[{ id: `${id}-in` }]}
      outputHandles={[{ id: `${id}-out` }]}
    >
      
      <Stack>
        <TextInput
          label="Search Query"
          type="text"
          value={currQuery}
          onChange={(e) => setCurrQuery(e.target.value)}
          placeholder="Enter Your Search Query"
          size="sm"
          styles={{
            input: {
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
                            },
                            label: { 
                              color: 'rgba(255, 255, 255, 0.9)',
                              fontWeight: 600,
                              fontSize: '12px'
                            }
                          }}
                        />
                          <Select
                                 label="Knowledge Base"
                                   placeholder="Select Knowledge Base"
                                   value={currKb}
                                   onChange={setCurrKb}
                                    data={[
                                      { value: 'kb1', label: 'Knowledge Base 1' },
                                      { value: 'kb2', label: 'Knowledge Base 2' },
                                      { value: 'kb3', label: 'Knowledge Base 3' },
                                    ]}
                                   size="sm"
                                   styles={{
                                     input: { 
                                       backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                       borderColor: 'rgba(255, 255, 255, 0.3)',
                                       color: 'white',
                                       backdropFilter: 'blur(10px)',
                                       '&:focus': {
                                         borderColor: '#00d4ff',
                                         boxShadow: '0 0 0 2px rgba(0, 212, 255, 0.2)'
                                       }
                                     },
                                     label: { 
                                       color: 'rgba(255, 255, 255, 0.9)',
                                       fontWeight: 600,
                                       fontSize: '12px'
                                     }
                                   }}
                                 />
                                 </Stack>
    </BaseNode>
  );
};
