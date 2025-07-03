// // // textNode.js

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
import { Textarea} from '@mantine/core';
import { useEffect, useRef } from 'react';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeSize, setNodeSize] = useState({ width: 200, height: 120 });
  const [variables, setVariables] = useState([]);
  

  // Function to extract variables from text
  const extractVariables = (text) => {
    const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    
    while ((match = variableRegex.exec(text)) !== null) {
      const variableName = match[1].trim();
      if (!matches.includes(variableName)) {
        matches.push(variableName);
      }
    }
    
    return matches;
  };
  const textareaRef = useRef(null);
  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };
  useEffect(() => {
    autoResize();
  }, [currText]);
  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    // Optional: resize immediately on change
    setTimeout(autoResize, 0);
  };

  useEffect(() => {
    const newVariables = extractVariables(currText);
    setVariables(newVariables);
  }, [currText]);

  // Create input handles for variables
  const inputHandles = variables.map((variable, index) => ({
    id: `${id}-${variable}`,
    position: 'left',
    style: {
      top: `${30 + (index * 25)}px`, // Position handles vertically
      left: '-8px'
    },
    label: variable
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      inputHandles={inputHandles}
      outputHandles={[{ id: `${id}-output` }]}
    >
      <Textarea
                          label="Text"
                          type="text"
                          value={currText}
                          ref={textareaRef}
                          onChange={handleTextChange}
                          placeholder="Enter Your Text"
                          size="sm"
                          styles={{
                            autoResize, // This handles auto-resize automatically!
                            minRows: 2,
                            maxRows: 6,
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
                              },
                               
                            },
                            label: { 
                              color: 'rgba(255, 255, 255, 0.9)',
                              fontWeight: 600,
                              fontSize: '12px'
                            }
                          }}
                        />
                          {/* Variable indicators */}
        {variables.length > 0 && (
          <div style={{
            marginTop: '8px',
            fontSize: '10px',
            color: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px'
          }}>
            <span>Variables:</span>
            {variables.map((variable, index) => (
              <span
                key={variable}
                style={{
                  backgroundColor: 'rgba(0, 212, 255, 0.2)',
                  border: '1px solid rgba(0, 212, 255, 0.5)',
                  borderRadius: '2px',
                  padding: '2px 4px',
                  fontSize: '9px'
                }}
              >
                {variable}
              </span>
            ))}
          </div>
        )}
      </BaseNode>
  );
};



// textNode.js
// import { useState, useEffect, useRef } from 'react';
// import { BaseNode } from './BaseNode';
// import { TextInput } from '@mantine/core';

// export const TextNode = ({ id, data }) => {
//   const [currText, setCurrText] = useState(data?.text || '{{input}}');
//   const [nodeSize, setNodeSize] = useState({ width: 200, height: 120 });
//   const [variables, setVariables] = useState([]);
//   const textareaRef = useRef(null);

//   // Function to extract variables from text
//   const extractVariables = (text) => {
//     const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
//     const matches = [];
//     let match;
    
//     while ((match = variableRegex.exec(text)) !== null) {
//       const variableName = match[1].trim();
//       if (!matches.includes(variableName)) {
//         matches.push(variableName);
//       }
//     }
    
//     return matches;
//   };

//   // Calculate dynamic size based on text content
//   const calculateSize = (text) => {
//     const lines = text.split('\n');
//     const maxLineLength = Math.max(...lines.map(line => line.length), 10);
    
//     // Calculate width based on longest line (approximate character width)
//     const minWidth = 200;
//     const charWidth = 8; // approximate pixels per character
//     const calculatedWidth = Math.max(minWidth, maxLineLength * charWidth + 60);
    
//     // Calculate height based on number of lines
//     const minHeight = 120;
//     const lineHeight = 20;
//     const baseHeight = 80; // header + padding
//     const calculatedHeight = Math.max(minHeight, baseHeight + (lines.length * lineHeight));
    
//     return {
//       width: Math.min(calculatedWidth, 400), // max width limit
//       height: Math.min(calculatedHeight, 300) // max height limit
//     };
//   };

//   // Update variables and size when text changes
//   useEffect(() => {
//     const newVariables = extractVariables(currText);
//     setVariables(newVariables);
    
//     const newSize = calculateSize(currText);
//     setNodeSize(newSize);
//   }, [currText]);

//   const handleTextChange = (e) => {
//     setCurrText(e.target.value);
//   };

//   // Create input handles for variables
//   const inputHandles = variables.map((variable, index) => ({
//     id: `${id}-${variable}`,
//     position: 'left',
//     style: {
//       top: `${30 + (index * 25)}px`, // Position handles vertically
//       left: '-8px'
//     },
//     label: variable
//   }));

//   return (
//     <BaseNode
//       id={id}
//       title="Text"
//       inputHandles={inputHandles}
//       outputHandles={[{ id: `${id}-output` }]}
//       style={{
//         width: nodeSize.width,
//         height: nodeSize.height,
//         minWidth: 200,
//         minHeight: 120
//       }}
//     >
//       <div style={{ 
//         padding: '10px',
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column'
//       }}>
//         <textarea
//           ref={textareaRef}
//           value={currText}
//           onChange={handleTextChange}
//           placeholder="Enter your text with variables like {{input}}"
//           style={{
//             width: '100%',
//             height: `${nodeSize.height - 80}px`,
//             backgroundColor: 'rgba(255, 255, 255, 0.1)',
//             borderColor: 'rgba(255, 255, 255, 0.3)',
//             color: 'white',
//             backdropFilter: 'blur(10px)',
//             border: '1px solid rgba(255, 255, 255, 0.3)',
//             borderRadius: '4px',
//             padding: '8px',
//             fontFamily: 'inherit',
//             fontSize: '12px',
//             resize: 'none',
//             outline: 'none',
//             whiteSpace: 'pre-wrap',
//             wordWrap: 'break-word',
//             overflowWrap: 'break-word'
//           }}
//           onFocus={(e) => {
//             e.target.style.borderColor = '#00d4ff';
//             e.target.style.boxShadow = '0 0 0 2px rgba(0, 212, 255, 0.2)';
//           }}
//           onBlur={(e) => {
//             e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
//             e.target.style.boxShadow = 'none';
//           }}
//         />
        
//         {/* Variable indicators */}
//         {variables.length > 0 && (
//           <div style={{
//             marginTop: '8px',
//             fontSize: '10px',
//             color: 'rgba(255, 255, 255, 0.7)',
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: '4px'
//           }}>
//             <span>Variables:</span>
//             {variables.map((variable, index) => (
//               <span
//                 key={variable}
//                 style={{
//                   backgroundColor: 'rgba(0, 212, 255, 0.2)',
//                   border: '1px solid rgba(0, 212, 255, 0.5)',
//                   borderRadius: '2px',
//                   padding: '2px 4px',
//                   fontSize: '9px'
//                 }}
//               >
//                 {variable}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>
//     </BaseNode>
//   );
// };