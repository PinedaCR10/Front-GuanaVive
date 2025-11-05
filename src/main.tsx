import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AppRoutes } from './router';
import { AuthInitializer } from './shared/components';
import './i18n/config';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
       <AuthInitializer> 
        <AppRoutes />
      </AuthInitializer> 
    </BrowserRouter>
  </StrictMode>
);
