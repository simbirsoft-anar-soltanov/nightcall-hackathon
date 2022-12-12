import { v4 as uuidv4 } from 'uuid';
import { firebase } from 'core/lib/firebase';

export const sendOrderForChangeStatusOrg = async (data: any, dataOrg: any) => {
  try {
    await firebase
      .firestore()
      .collection('request')
      .add({
        ...data,
        city: dataOrg.city,
        email: dataOrg.email,
        logo: dataOrg.avatar,
        organization_id: uuidv4(),
        phoneNumber: dataOrg.numberPhone,
        previewPhoto: dataOrg.avatar,
        requestId: uuidv4(),
        status: 'active',
      });
    return true;
  } catch (err) {
    console.log(err);
  }
};
