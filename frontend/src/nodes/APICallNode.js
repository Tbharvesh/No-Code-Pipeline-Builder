// nodes/APICallNode.js
import { BaseNode } from './BaseNode';
import { useState } from 'react';

export const APICallNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.publicapis.org/entries');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const json = await res.json();
      setResponse(JSON.stringify(json, null, 2).slice(0, 300) + '...');
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseNode
      id={id}
      title="API Call"
      inputHandles={[{ id: `${id}-trigger` }]}
      outputHandles={[{ id: `${id}-response` }]}
    >
      <label>
        API URL:
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com"
          style={{ width: '100%' }}
        />
      </label>

      <button onClick={handleFetch} style={{ marginTop: 8 }}>
        {loading ? 'Loading...' : 'Fetch'}
      </button>

      {error && <div style={{ color: 'red', fontSize: 12 }}>{error}</div>}
      {response && (
        <pre style={{ fontSize: 10, maxHeight: 100, overflow: 'auto' }}>
          {response}
        </pre>
      )}
    </BaseNode>
  );
};
