import { FC } from 'react';
import Routing from 'core/routing/Routing';
import MuiTheme from 'core/theme/MuiTheme';
import { UserContext } from './context/user';
import { useAuthListener } from 'core/hooks/useAuthListener';

const App: FC = () => {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <MuiTheme>
        <Routing />
      </MuiTheme>
    </UserContext.Provider>
  );
};

App.displayName = 'App';

export default App;
