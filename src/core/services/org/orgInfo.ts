import { firebase } from 'core/lib/firebase';
import { tUser } from 'core/helpers/types';

export const orgInfoById = async (
  organization_id: string,
): Promise<tUser[]> => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('organization_id', 'in', [organization_id])
    .get();

  const orgInfoById = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  })) as tUser[];

  return orgInfoById;
};
