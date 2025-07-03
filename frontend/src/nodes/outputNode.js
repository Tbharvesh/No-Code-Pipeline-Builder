// // outputNode.js

// import { useState } from 'react';
// import { Handle, Position } from 'reactflow';

// export const OutputNode = ({ id, data }) => {
//   const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
//   const [outputType, setOutputType] = useState(data.outputType || 'Text');

//   const handleNameChange = (e) => {
//     setCurrName(e.target.value);
//   };

//   const handleTypeChange = (e) => {
//     setOutputType(e.target.value);
//   };

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-value`}
//       />
//       <div>
//         <span>Output</span>
//       </div>
//       <div>
//         <label>
//           Name:
//           <input 
//             type="text" 
//             value={currName} 
//             onChange={handleNameChange} 
//           />
//         </label>
//         <label>
//           Type:
//           <select value={outputType} onChange={handleTypeChange}>
//             <option value="Text">Text</option>
//             <option value="File">Image</option>
//           </select>
//         </label>
//       </div>
//     </div>
//   );
// }



//Updated code for outputNode.js
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
