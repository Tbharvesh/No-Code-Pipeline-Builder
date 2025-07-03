//MathNode.js
import { BaseNode } from './BaseNode';
import { TextInput, Select, Text, Stack, Group, Badge } from '@mantine/core';
import { useState, useEffect } from 'react';

export const MathNode = ({ id, data, selected }) => {
  const [a, setA] = useState(data?.a?.toString() ?? '');
  const [b, setB] = useState(data?.b?.toString() ?? '');
  const [operation, setOperation] = useState(data?.operation || 'add');
  const [result, setResult] = useState(0);

  useEffect(() => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    let res = 0;

    if (!isNaN(numA) && !isNaN(numB)) {
      switch (operation) {
        case 'add':
          res = numA + numB;
          break;
        case 'subtract':
          res = numA - numB;
          break;
        case 'multiply':
          res = numA * numB;
          break;
        case 'divide':
          res = numB !== 0 ? numA / numB : '∞';
          break;
        default:
          res = 0;
      }
    }

    setResult(res);
  }, [a, b, operation]);

  const getOperationSymbol = (op) => {
    switch (op) {
      case 'add': return '+';
      case 'subtract': return '−';
      case 'multiply': return '×';
      case 'divide': return '÷';
      default: return '+';
    }
  };

  return (
    <BaseNode 
      id={id} 
      title="Math Calculator" 
      description="Performs mathematical operations"
      icon="🔢"
      outputHandles={[{ id: `${id}-result` }]}
      selected={selected}
    >
      <Stack gap="md">
        <Group grow>
          <TextInput
            label="Value A"
            value={a}
            onChange={(e) => setA(e.currentTarget.value)}
            type="number"
            placeholder="0"
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
          <TextInput
            label="Value B"
            value={b}
            onChange={(e) => setB(e.currentTarget.value)}
            type="number"
            placeholder="0"
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
        </Group>

        <Select
          label="Operation"
          value={operation}
          onChange={setOperation}
          data={[
            { value: 'add', label: 'Addition (+)' },
            { value: 'subtract', label: 'Subtraction (−)' },
            { value: 'multiply', label: 'Multiplication (×)' },
            { value: 'divide', label: 'Division (÷)' },
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

        {/* Operation Preview */}
        <Group justify="center" mt="xs">
          <Text size="lg" c="white" fw={500}>
            {a || '0'} {getOperationSymbol(operation)} {b || '0'}
          </Text>
        </Group>

        {/* Result Display */}
        <Group justify="center">
          <Badge 
            size="lg" 
            variant="light" 
            color="cyan"
            style={{
              background: 'rgba(0, 212, 255, 0.2)',
              border: '1px solid rgba(0, 212, 255, 0.4)',
              color: '#00d4ff',
              fontSize: '14px',
              fontWeight: 700
            }}
          >
            Result: {typeof result === 'number' ? result.toFixed(2) : result}
          </Badge>
        </Group>
      </Stack>
    </BaseNode>
  );
};