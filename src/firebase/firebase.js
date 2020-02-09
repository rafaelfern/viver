import * as firebase from 'firebase';

let firebaseConfig = {
    apiKey: "AIzaSyAXmx1E0wdKz5B1gkH2PfjqsXRJ7TeBR_Q",
    authDomain: "teste-leonardo-12951.firebaseapp.com",
    databaseURL: "https://teste-leonardo-12951.firebaseio.com",
    projectId: "teste-leonardo-12951",
    storageBucket: "teste-leonardo-12951.appspot.com",
    messagingSenderId: "322768938163",
    appId: "1:322768938163:web:46c1a4c9ffcc218aa8fcc6"
};

firebase.initializeApp(firebaseConfig);

export default firebase;