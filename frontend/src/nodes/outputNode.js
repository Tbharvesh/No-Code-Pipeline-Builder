import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { TextInput, Select } from '@mantine/core';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState('');
  const [outputType, setOutputType] = useState('');

  return (
    <BaseNode
      id={id}
      title="Output"
      inputHandles={[{ id: `${id}-value` }]}
    >
      <TextInput
                          label="Name"
                          type="text"
                          value={currName}
                          onChange={(e) => setCurrName(e.target.value)}
                          placeholder="Enter Your Name"
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
                               label="Type"
                                 placeholder="Select output type"
                               
                                 value={outputType}
                                 onChange={setOutputType}
                                 data={[
                                   { value: 'Text', label: 'Text' },
                                   { value: 'File', label: 'File' },
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
              
      
      
      
    </BaseNode>
  );
};
