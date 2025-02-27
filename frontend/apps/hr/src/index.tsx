import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'rsuite/dist/rsuite-no-reset.min.css';
import 'material-symbols';
import App from './app/App';

import '@repo/shared/styles';

import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';

const container = document.getElementById('root');

if (!container) {
  throw new Error(
    'Контейнер root не найден. Не удалось вмонтировать реакт приложение.',
  );
}

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,
);
