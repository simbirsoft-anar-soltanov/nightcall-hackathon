import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from 'lib/firebase';

const useGetCollection = (name: string) => {
  const stateCollection = useCollection(collection(db, name), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return stateCollection;
};

export default useGetCollection;
