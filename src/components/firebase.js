import firebase from "firebase"
import "firebase/auth"

const app = firebase.initializeApp({

    // ????????????????????????????????????????????????????
    
    apiKey: "AIzaSyCbnlOewLIreyftyX2QgEd1fu1zWU9fA5s",
    authDomain: "pss-auth-dev.firebaseapp.com",
    databaseURL: "https://pss-auth-dev.firebaseio.com",
    projectId: "pss-auth-dev",
    storageBucket: "pss-auth-dev.appspot.com",
    messagingSenderId: "484643818210",
    appId: "1:484643818210:web:22ca27fdb30b4aded12cbb"
    
    //apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    //authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    //databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    //projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    //storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    //messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    //appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const auth = app.auth()
export default app