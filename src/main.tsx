import React from 'react';
import { createRoot } from 'react-dom/client';
import { Routes } from '@generouted/react-router';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
