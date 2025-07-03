// nodes/MathNode.js

import { BaseNode } from './BaseNode';
import { useState, useEffect } from 'react';

export const MathNode = ({ id, data }) => {
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



  return (
    <BaseNode
      id={id}
      title="Math"
      outputHandles={[{ id: `${id}-result` }]}
    >
      <div>
        <label>
          A:
          <input
            type="number"
            placeholder='Enter A'
            value={a}
            onChange={(e) => setA(e.target.value)}
            />
        </label>
        <br />
        <label>
          B:
          <input
  type="number"
    placeholder='Enter B'
  value={b}
  onChange={(e) => setB(e.target.value)}
/>
        </label>
        <br />
        <label>
          Operation:
          <select value={operation} onChange={(e) => setOperation(e.target.value)}>
            <option value="add">+</option>
            <option value="subtract">−</option>
            <option value="multiply">×</option>
            <option value="divide">÷</option>
          </select>
        </label>
        <div style={{ marginTop: 10 }}>
          <strong>Result: {result}</strong>
        </div>
      </div>
    </BaseNode>
  );
};
