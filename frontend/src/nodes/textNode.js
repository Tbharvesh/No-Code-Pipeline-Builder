// // textNode.js

// import { useState } from 'react';
// import { Handle, Position } from 'reactflow';

// export const TextNode = ({ id, data }) => {
//   const [currText, setCurrText] = useState(data?.text || '{{input}}');

//   const handleTextChange = (e) => {
//     setCurrText(e.target.value);
//   };

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <div>
//         <span>Text</span>
//       </div>
//       <div>
//         <label>
//           Text:
//           <input 
//             type="text" 
//             value={currText} 
//             onChange={handleTextChange} 
//           />
//         </label>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-output`}
//       />
//     </div>
//   );
// }



// textNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { TextInput } from '@mantine/core';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  return (
    <BaseNode
      id={id}
      title="Text"
      outputHandles={[{ id: `${id}-output` }]}
    >
      <TextInput
                          label="Text"
                          type="text"
                          value={currText}
                          onChange={(e) => setCurrText(e.target.value)}
                          placeholder="Enter Your Text"
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
    
    </BaseNode>
  );
};
