// This file initializes the Firebase SDK with your project's configuration.

// IMPORTANT: Replace the following placeholder values with your own
// Firebase project's configuration. You can find this information
// in the Firebase console under "Project settings".

const firebaseConfig = {
  apiKey:"AIzaSyAdFacKpfnIZudtHY30x_GC5-xwegdh1TI" ,
  authDomain:"career-guidance-23a5c.firebaseapp.com" ,
  projectId: "career-guidance-23a5c",
  storageBucket: "career-guidance-23a5c.firebasestorage.app",
  messagingSenderId:"375027497963" ,
  appId: "1:375027497963:web:32296476a9d8ae7335b7ae"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get instances of the Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// You can add logging here to confirm Firebase has initialized.
// For example:
// console.log("Firebase initialized successfully.");
