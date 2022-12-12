import { createContext, Context } from 'react';
import Firebase from 'firebase/compat/app';

type tUserContext = Context<{ user: Firebase.User }>;

export const UserContext: tUserContext = createContext({
  user: {} as Firebase.User,
});
