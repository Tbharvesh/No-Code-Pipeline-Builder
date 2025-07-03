// toolbar.js

// import { DraggableNode } from './draggableNode';

// export const PipelineToolbar = () => {

//     return (
//         <div style={{ padding: '10px' }}>
//             <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
//                 <DraggableNode type='customInput' label='Input' />
//                 <DraggableNode type='llm' label='LLM' />
//                 <DraggableNode type='customOutput' label='Output' />
//                 <DraggableNode type='text' label='Text' />
//                 <DraggableNode type='log' label='Log' />
//                 <DraggableNode type='filter' label='FilterNode' />
//                 <DraggableNode type='apiCall' label='APICallNode' />
//                 <DraggableNode type='math' label='MathNode' />
//                 <DraggableNode type='imageDisplay' label='ImageDisplayNode' />

//             </div>
//         </div>
//     );
// };
import { Group, Paper, Text, Container } from '@mantine/core';
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <Container fluid>
      <Paper 
        p="xl" 
        radius="xl" 
        style={{
          background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Text 
          fw={700} 
          size="xl" 
          mb="xl" 
          c="white"
          style={{
            textAlign: 'center',
            letterSpacing: '1px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          🛠️ Node Toolkit
        </Text>
        
        <Group gap="lg" justify="center">
          <DraggableNode 
            type='customInput' 
            label='Input' 
            icon='📝'
            description='Data input'
          />
          <DraggableNode 
            type='llm' 
            label='LLM' 
            icon='🤖'
            description='AI processing'
          />
          <DraggableNode 
            type='customOutput' 
            label='Output' 
            icon='📤'
            description='Result output'
          />
          <DraggableNode 
            type='text' 
            label='Text' 
            icon='📄'
            description='Text content'
          />
          <DraggableNode 
            type='log' 
            label='Logger' 
            icon='📋'
            description='Log messages'
          />
          <DraggableNode 
            type='filter' 
            label='Filter' 
            icon='🔍'
            description='Data filtering'
          />
          <DraggableNode 
            type='apiCall' 
            label='API Call' 
            icon='🌐'
            description='External API'
          />
          <DraggableNode 
            type='math' 
            label='Math' 
            icon='🔢'
            description='Mathematical ops'
          />
          <DraggableNode 
            type='imageDisplay' 
            label='Image' 
            icon='🖼️'
            description='Image display'
          />
        </Group>
      </Paper>
    </Container>
  );
};