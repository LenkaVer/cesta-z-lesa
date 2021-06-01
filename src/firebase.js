import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCQqWuCK0au-LOMlwPYP5rT3L1hv4L00cM',
  authDomain: 'cesta-z-lesa.firebaseapp.com',
  projectId: 'cesta-z-lesa',
  storageBucket: 'cesta-z-lesa.appspot.com',
  messagingSenderId: '1050905006230',
  appId: '1:1050905006230:web:8d4fd9f4b5657e403e32b7',
});

export const auth = app.auth();
export const db = firebase.firestore();
export default app;
