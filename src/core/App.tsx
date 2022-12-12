import { FC } from 'react';
import Routing from 'core/routing/Routing';
import MuiTheme from 'core/theme/MuiTheme';
import { UserContext } from './context/user';
import { useAuthListener } from 'core/hooks/useAuthListener';

const App: FC = () => {
  const { user } = useAuthListener();

  return user ? (
    <UserContext.Provider value={{ user }}>
      <MuiTheme>
        <Routing />
      </MuiTheme>
    </UserContext.Provider>
  ) : (
    <MuiTheme>
      <Routing />
    </MuiTheme>
  );
};

App.displayName = 'App';

export default App;
