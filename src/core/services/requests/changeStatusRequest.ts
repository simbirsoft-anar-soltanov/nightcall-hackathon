import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'core/lib/firebase';
import { tCardProps } from 'components/controls/Card/Card';

export const changeStatusRequest = async (
  { docId }: tCardProps['request'],
  changeStatus: string,
  nameCollection?: string,
): Promise<void> => {
  if (!nameCollection) return;

  const taskDocRef = doc(db, nameCollection, docId);
  await updateDoc(taskDocRef, { status: changeStatus });
};
