import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, getFirestore } from 'firebase/firestore';
import { firebase } from 'lib/firebase';

const useGetCollection = (name: string) => {
  const stateCollection = useCollection(
    collection(getFirestore(firebase), name),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  return stateCollection;
};

export default useGetCollection;
