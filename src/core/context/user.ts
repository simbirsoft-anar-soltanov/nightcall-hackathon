import { createContext, Context } from 'react';
import Firebase from 'firebase/compat/app';

export const UserContext: Context<{
  user: Firebase.User;
}> = createContext({ user: {} as Firebase.User });
