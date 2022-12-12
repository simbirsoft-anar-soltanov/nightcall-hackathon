import { doc, updateDoc } from 'firebase/firestore';
import { db, FieldValue } from 'core/lib/firebase';

export const joinToEvent = async (
  docId: string,
  event: any,
  isUnFollow?: boolean,
): Promise<void> => {
  const userDocRef = doc(db, 'users', docId);

  await updateDoc(userDocRef, {
    joinEvents: isUnFollow
      ? FieldValue.arrayRemove(event)
      : FieldValue.arrayUnion(event),
  });
};
