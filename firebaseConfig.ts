import {initializeApp} from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyB8rANSR3HoQdSprafHYjKw_wI5WOazlgQ',
    authDomain: 'utmcs-1bcf2.firebaseapp.com',
    databaseURL: 'https://utmcs-1bcf2-default-rtdb.firebaseio.com',
    projectId: 'utmcs-1bcf2',
    storageBucket: 'utmcs-1bcf2.appspot.com',
    messagingSenderId: '669197706574',
    appId: '1:669197706574:web:e972d2e24776573d60aa1f',
    measurementId: 'G-2LNR16P8J4',
    locationId: 'us-central',
};

export const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
