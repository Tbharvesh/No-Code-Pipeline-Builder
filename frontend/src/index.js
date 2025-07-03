
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        colorScheme: 'dark',
        fontFamily: 'Inter, sans-serif',
        primaryColor: 'blue',
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);