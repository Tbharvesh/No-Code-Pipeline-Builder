import { Paper, Text, Group, Box , Stack} from '@mantine/core';

export const DraggableNode = ({ type, label, icon, description }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnd = (event) => {
    event.target.style.cursor = 'grab';
  };

  return (
    <Paper
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      draggable
      p="md"
      radius="lg"
      style={{
        cursor: 'grab',
        minWidth: 140,
        minHeight: 90,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: '2px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }}
    >
      {/* Background Pattern */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40px',
          height: '40px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          transform: 'translate(15px, -15px)',
        }}
      />

      <Group direction="column" gap="xs" align="center" style={{ zIndex: 1, position: 'relative' }}>
        
       
        <Stack spacing={1} align='center'>
          {/* Icon */}
           <Box
          style={{
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {icon || '🔧'}
          
        </Box>

        {/* Label */}
        <Text 
          c="white" 
          size="sm" 
          fw={700} 
          ta="center"
          style={{ 
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.5px'
          }}
        >
          {label}
        </Text>
       

        {/* Description */}
        {description && (
          <Text 
            c="rgba(255, 255, 255, 0.8)" 
            size="xs" 
            ta="center"
            style={{ 
              fontSize: '15px',
              lineHeight: 1.2
            }}
          >
            {description}
          </Text>
        )}
        </Stack>
      </Group>
    </Paper>
  );
};