import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDT91jb4fvwaTMEmmJrV60CPKxqUX8Qg8w",
    authDomain: "timeless-48015.firebaseapp.com",
    projectId: "timeless-48015",
    storageBucket: "timeless-48015.appspot.com",
    messagingSenderId: "602044477009",
    appId: "1:602044477009:web:3a4fed576e01502f6f9270"
  };
firebase.initializeApp(config);

export default firebase;