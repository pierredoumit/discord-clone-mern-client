import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBUQ5hF0iMiSU7F8lZCTVVVyuRNIgWRAOk",
    authDomain: "discord-mern-9d404.firebaseapp.com",
    databaseURL: "https://discord-mern-9d404.firebaseio.com",
    projectId: "discord-mern-9d404",
    storageBucket: "discord-mern-9d404.appspot.com",
    messagingSenderId: "962528790265",
    appId: "1:962528790265:web:b00b93e0a2660e49f5c428"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;