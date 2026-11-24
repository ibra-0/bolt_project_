import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import DurationChecker from './practice12/DurationChecker';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {window.location.hash === '#practice12' ? <DurationChecker /> : <App />}
  </StrictMode>
);
