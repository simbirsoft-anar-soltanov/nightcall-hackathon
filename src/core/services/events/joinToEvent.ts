import { doc, updateDoc } from 'firebase/firestore';
import { db, FieldValue } from 'core/lib/firebase';
import { tDocumentEvent } from 'core/helpers/types';

export const joinToEvent = async (
  docId: string,
  event: tDocumentEvent,
  isUnFollow?: boolean,
): Promise<void> => {
  const userDocRef = doc(db, 'users', docId);

  await updateDoc(userDocRef, {
    joinEvents: isUnFollow
      ? FieldValue.arrayRemove(event)
      : FieldValue.arrayUnion(event),
  });
};
