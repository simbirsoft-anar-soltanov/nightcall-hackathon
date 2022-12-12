import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'core/lib/firebase';

export const changeEmployeeStatus = async (
  userId: string,
  statusReadyJoinToEvent: string,
): Promise<void> => {
  const taskDocRef = doc(db, 'users', userId);
  await updateDoc(taskDocRef, { statusReadyJoinToEvent });
};
