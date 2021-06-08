import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyD58nb0B32BK5Ys8EoYIz--UVNBEjKAlX8",
    authDomain: "chatapp-2778f.firebaseapp.com",
    projectId: "chatapp-2778f",
    storageBucket: "chatapp-2778f.appspot.com",
    messagingSenderId: "244420376032",
    appId: "1:244420376032:web:23dfc3116fe2d1baf46785"
};

const app = !firebase.apps.length 
? firebase.initializeApp(firebaseConfig) 
: firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {
    db, auth, provider
}
