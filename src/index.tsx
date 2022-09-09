import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from 'core/App';
import { FirebaseContext } from 'core/context/firebase';
import { firebase, FieldValue } from 'core/lib/firebase';
import ErrorBoundary from 'core/components/ErrorBoundary/ErrorBoundary';
import { default as packageInfo } from '../package.json';
import 'src/index.scss';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <StrictMode>
    <ErrorBoundary>
      <FirebaseContext.Provider value={{ firebase, FieldValue }}>
        <App />
      </FirebaseContext.Provider>
    </ErrorBoundary>
  </StrictMode>,
);

console.log(
  '%c%s',
  'color: #EF3124; font: 1.2rem/1 Styrene B LC;',
  `version: ${packageInfo.version}`,
);
