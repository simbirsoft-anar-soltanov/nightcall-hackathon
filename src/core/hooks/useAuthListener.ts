import { useState, useEffect, useContext } from 'react';
import Firebase from 'firebase/compat/app';
import { FirebaseContext } from '../context/firebase';

export const useAuthListener = () => {
  const { firebase } = useContext(FirebaseContext);

  const [user, setUser] = useState<Firebase.User | null>(
    JSON.parse(localStorage.getItem('authUser') || '{}'),
  );

  useEffect(() => {
    const listener = firebase?.auth()?.onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener();
  }, [firebase]);

  return { user };
};
