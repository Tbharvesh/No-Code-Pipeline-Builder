// TextNode.js
import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';
import { Textarea } from '@mantine/core';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [nodeSize, setNodeSize] = useState({ width: 200, height: 120 });

  const textareaRef = useRef(null);

  // Extract variables from the current text
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

  // Handle auto-resizing
  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    autoResize();
  }, [currText]);

  // Handle text change
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateNodeField(id, 'text', newText);
    setTimeout(autoResize, 0);
  };

  // Extract variables whenever text changes
  useEffect(() => {
    const newVariables = extractVariables(currText);
    setVariables(newVariables);
  }, [currText]);

  // Update currText when a new edge connects
 useEffect(() => {
  const incomingEdges = edges.filter(edge => edge.target === id);
  if (incomingEdges.length > 0) {
    const sourceId = incomingEdges[0].source;
    const inputNode = nodes.find((node) => node.id === sourceId);

    if (inputNode?.data?.text && inputNode.data.text !== currText) {
      setCurrText(inputNode.data.text);
    }
  }
}, [edges, nodes, currText, id]);


  // Static invisible handle for connections
  const inputHandles = [
    {
      id: `${id}-input`, // Fixed ID
      position: 'left',
      style: {
        top: '50%',
        left: '-8px',
        opacity: 0, // Invisible but still connectable
        pointerEvents: 'auto', // Important: allow edge connection
      },
      label: 'input',
    },
  ];

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
          autoResize,
          minRows: 2,
          maxRows: 6,
          input: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            color: 'white',
            backdropFilter: 'blur(10px)',
            '&:focus': {
              borderColor: '#00d4ff',
              boxShadow: '0 0 0 2px rgba(0, 212, 255, 0.2)',
            },
            '&::placeholder': {
              color: 'rgba(255, 255, 255, 0.5)',
            },
          },
          label: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 600,
            fontSize: '12px',
          },
        }}
      />

      {/* Variable display */}
      {variables.length > 0 && (
        <div
          style={{
            marginTop: '8px',
            fontSize: '10px',
            color: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
          }}
        >
          <span>Variables:</span>
          {variables.map((variable) => (
            <span
              key={variable}
              style={{
                backgroundColor: 'rgba(0, 212, 255, 0.2)',
                border: '1px solid rgba(0, 212, 255, 0.5)',
                borderRadius: '2px',
                padding: '2px 4px',
                fontSize: '9px',
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
