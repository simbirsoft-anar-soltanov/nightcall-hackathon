import { useState, useEffect } from 'react';
import { tUser, UseUserType } from '../helpers/types';
import { getUserByUserId } from './../services/firebase';

const useUser = (userId: string): UseUserType => {
  const [activeUser, setActiveUser] = useState<tUser>({} as tUser);

  useEffect(() => {
    const getUserObjByUserId = async (userId: string) => {
      const [user]: tUser[] = await getUserByUserId(userId);
      setActiveUser(user || ({} as tUser));
    };

    if (userId) {
      getUserObjByUserId(userId);
    }
  }, [userId]);

  return { user: activeUser, setActiveUser };
};

export default useUser;
