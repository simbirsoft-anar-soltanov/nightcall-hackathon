import { createContext, Context } from 'react';
import Firebase from 'firebase/compat/app';

type tFirebaseContext = {
  firebase: Firebase.app.App;
  FieldValue: typeof Firebase.firestore.FieldValue;
};

export const FirebaseContext: Context<tFirebaseContext> = createContext(
  {} as tFirebaseContext,
);
