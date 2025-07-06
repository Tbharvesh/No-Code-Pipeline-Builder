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
