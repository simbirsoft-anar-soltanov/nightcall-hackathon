import { FC } from 'react';
import Routing from './routing/Routing';
import MuiTheme from './theme/MuiTheme';

const App: FC = () => (
  <MuiTheme>
    <Routing />
  </MuiTheme>
);

App.displayName = 'App';

export default App;
