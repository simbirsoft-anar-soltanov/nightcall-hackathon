import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from 'core/App';
import { FirebaseContext } from 'core/context/firebase';
import { firebase, FieldValue } from 'core/lib/firebase';
import { default as packageInfo } from '../package.json';
import 'src/index.scss';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <StrictMode>
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <App />
    </FirebaseContext.Provider>
  </StrictMode>,
);

console.log(
  '%c%s',
  'color: #EF3124; font: 1.2rem/1 Styrene B LC;',
  `version: ${packageInfo.version}`,
);
