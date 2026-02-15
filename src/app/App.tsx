import ErrorBoundary from '@components/common/ErrorBoundary';
import { AppProviders } from '@providers';
import { AppRoutes } from '@routes';
import React from 'react';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </ErrorBoundary>
  );
};

export default App;
