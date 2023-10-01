import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import '@firebase/storage';

const app = firebase.initializeApp({
    apiKey: process.env.GATSBY_APP_API_KEY,
    authDomain: process.env.GATSBY_APP_AUTH_DOMAIN,
    databaseURL: process.env.GATSBY_APP_DATABASE_URL,
    projectId: process.env.GATSBY_APP_PROJECT_ID,
    storageBucket: process.env.GATSBY_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.GATSBY_APP_MESSAGING_SENDER_ID,
    appId: process.env.GATSBY_APP_APP_ID,
    measurementId: process.env.GATSBY_APP_MEASURINGID
});

export default app;
