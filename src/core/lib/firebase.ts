import { Auth, getAuth } from 'firebase/auth';
import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

type configType = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

const firebaseConfig: configType = {
  apiKey: 'AIzaSyBYCArjSXFrd-rmSEGWupgAvtvQJY4pyx0',
  authDomain: 'simbirhelp.firebaseapp.com',
  projectId: 'simbirhelp',
  storageBucket: 'simbirhelp.appspot.com',
  messagingSenderId: '730450477162',
  appId: '1:730450477162:web:dec1d4822f8d0596c3ca13',
  measurementId: 'G-BVLF0T1105',
};

const firebase: Firebase.app.App = Firebase.initializeApp(firebaseConfig);
const auth: Auth = getAuth(firebase);
const { FieldValue } = Firebase.firestore;

export { firebase, auth, FieldValue };
