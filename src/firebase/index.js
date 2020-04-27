import 'firebase/storage';
import 'firebase/firestore';
import firebase, { database } from 'firebase/app';
require('firebase/auth');
require('firebase/database');
require('firebase/storage');


var firebaseConfig = {

    apiKey: "AIzaSyB3uJVL8fY8NTnXLHEy_pO5BAQMs4Kooas",
    authDomain: "fashionbook-ac9b4.firebaseapp.com",
    databaseURL: "https://fashionbook-ac9b4.firebaseio.com",
    projectId: "fashionbook-ac9b4",
    storageBucket: "fashionbook-ac9b4.appspot.com",
    messagingSenderId: "110215446031",
    appId: "1:110215446031:web:a28cc76bf032cefb07ad7a"

  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  
  var db = firebase.firestore(app);
     
  
  export {
       db, firebase, app as default
  }