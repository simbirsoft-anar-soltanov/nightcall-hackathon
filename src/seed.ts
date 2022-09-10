import Firebase from 'firebase/compat/app';

export const seedDatabase = (firebase: Firebase.app.App): void => {
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection('request')
      .add({
        phoneNumber: '+7999999999',
        aboutSelf:
          'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
        requestId: '10' + i,
        city: 'Samara',
        status: 'active',
        logo: 'https://i.ibb.co/pdVMWGR/png-clipart-computer-icons-child-desktop-volunteering-child-child-text.png',
        previewPhoto: 'https://i.ibb.co/gMSX8Xs/eco-volonterstvo.jpg',
        email: 'soltanovanar@mail.ru',
        organizationName: `Test${i}`,
      });
  }
};
