// nodes/APICallNode.js
import { BaseNode } from './BaseNode';
import { useState } from 'react';
import { TextInput, Button , ScrollArea,Stack, Paper , Box} from '@mantine/core';

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
        <TextInput
        label="API URL"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://api.example.com"
        size="sm"
        styles={{
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
      {error && <div style={{ color: 'red', fontSize: 12 }}>{error}</div>}
      <Stack >
      <Button onClick={handleFetch} style={{ marginTop: 8 }}>{loading ? 'Loading...' : 'Fetch'}</Button>


      
        {response && (
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <ScrollArea h={100} >
            <Paper
              withBorder
              radius="sm"
              p="xs"
              style={{
                width: '300px',          
                maxWidth: '100%',       
                overflowWrap: 'break-word',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: 'white',
                fontSize: 12,
                whiteSpace: 'pre-wrap',
              }}
            >
              {response}
            </Paper>
          </ScrollArea>
          </Box>
        )}
        </Stack>
    </BaseNode>
  );
};
