import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const  firebaseConfig = {
    apiKey: "AIzaSyDjjHg0vDxuLPEgaBvdRRPFBMZ3HXbS3zQ",
    authDomain: "react-app-cursos-35ce2.firebaseapp.com",
    projectId: "react-app-cursos-35ce2",
    storageBucket: "react-app-cursos-35ce2.appspot.com",
    messagingSenderId: "26780420754",
    appId: "1:26780420754:web:eb82ed7cc6d3258aa9f44b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }