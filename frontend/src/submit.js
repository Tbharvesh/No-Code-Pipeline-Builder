// submit.js


import { Button, Modal, Text, Group, Stack, Badge, Alert } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';


const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [opened, { open, close }] = useDisclosure(false);
  const [results, setResults] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Backend response:', result);
      
      // Set results and show modal
      setResults(result);
      setIsError(false);
      open();
      
    } catch (err) {
      console.error('Submission failed:', err);
      setResults({ error: err.message });
      setIsError(true);
      open();
    }
  };

  return (
    <>
      <div style={{ padding: '1rem' }}>
        <Button onClick={handleSubmit} color="blue" variant="filled">
          Submit Pipeline
        </Button>
      </div>

      <Modal 
        opened={opened} 
        onClose={close}
        title={isError ? "Submission Failed" : "Pipeline Analysis Results"}
        centered
        size="md"
      >
        {isError ? (
          <Alert
           
            title="Error"
            color="red"
            variant="light"
          >
            <Text>{results?.error}</Text>
          </Alert>
        ) : (
          <Stack spacing="md">
            <Alert
             
              title="Analysis Complete"
              color="blue"
              variant="light"
            >
              Your pipeline has been successfully analyzed!
            </Alert>
            
            <Group position="apart">
              <Text size="sm" color="dimmed">Number of Nodes:</Text>
              <Badge color="blue" variant="light" size="lg">
                {results?.num_nodes}
              </Badge>
            </Group>
            
            <Group position="apart">
              <Text size="sm" color="dimmed">Number of Edges:</Text>
              <Badge color="green" variant="light" size="lg">
                {results?.num_edges}
              </Badge>
            </Group>
            
            <Group position="apart">
              <Text size="sm" color="dimmed">Is Valid DAG:</Text>
              <Badge 
                color={results?.is_dag ? "green" : "red"} 
                variant="filled" 
                size="lg"
                
              >
                {results?.is_dag ? "Yes" : "No"}
              </Badge>
            </Group>
            
            <Alert
             
              title={results?.is_dag ? "Valid Pipeline" : "Invalid Pipeline"}
              color={results?.is_dag ? "green" : "orange"}
              variant="light"
            >
              {results?.is_dag ? 
                " Your pipeline is a valid Directed Acyclic Graph! It can be executed without circular dependencies." : 
                "⚠️ Your pipeline contains cycles and is not a valid DAG. Please review the connections to remove circular dependencies."
              }
            </Alert>
          </Stack>
        )}
      </Modal>
    </>
  );
};