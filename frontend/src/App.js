import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { Container, Stack, Box } from '@mantine/core';

function App() {
  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        padding: '20px',
      }}
    >
      <Container fluid size="xl" >
        <Stack gap="md" justify="center" align="center">
          <PipelineToolbar />
          <PipelineUI />
          <SubmitButton />
        </Stack>
      </Container>
    </Box>
  );
}

export default App;