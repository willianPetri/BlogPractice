import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
  apiKey: "AIzaSyBurS_hwIGtDIBjorkqA6YKpUZDlATiAQ0",
  authDomain: "blog-19dd2.firebaseapp.com",
  databaseURL: "https://blog-19dd2.firebaseio.com",
  projectId: "blog-19dd2",
  storageBucket: "blog-19dd2.appspot.com",
  messagingSenderId: "403019641750",
  appId: "1:403019641750:web:2f55e71d6df54556f223b7",
  measurementId: "G-BSZ8Y562C1"
};

class Firebase{

  constructor(){
    app.initializeApp(firebaseConfig);

    this.app = app.database();

    this.storage = app.storage();
  }

  login(email, password){
    return app.auth().signInWithEmailAndPassword(email, password)
  }

  async register(nome, email, password){
    await app.auth().createUserWithEmailAndPassword(email, password)

    const uid = app.auth().currentUser.uid;

    return app.database().ref('usuarios').child(uid).set({
      nome: nome
    })
  }

  logout(){
    return app.auth().signOut();
  }

  isInitialized(){
    return new Promise(resolve => {
      app.auth().onAuthStateChanged(resolve);
    })
  }

  getCurrent(){
    return app.auth().currentUser && app.auth().currentUser.email
  }

  getCurrentUid(){
    return app.auth().currentUser && app.auth().currentUser.uid
  }

  async getUserName(callback){
    if(!app.auth().currentUser){
      return null;
    }

    const uid = app.auth().currentUser.uid;    

    await app.database().ref('usuarios').child(uid).once('value').then(callback);

  }
}

export default new Firebase();