import * as firebase from 'firebase'
const config = {
  apiKey: 'AIzaSyANuPamMiFU8iUOy5R975Ol3IYlGHW-j9g',
  authDomain: 'fir-with-mern.firebaseapp.com',
  projectId: 'fir-with-mern',
  storageBucket: 'fir-with-mern.appspot.com',
  messagingSenderId: '995271263480',
  appId: '1:995271263480:web:4f555ff962f3420d96670d',
  measurementId: 'G-SDBLR59NZ0',
}
firebase.initializeApp(config)
const databaseRef = firebase.database().ref()
export const todosRef = databaseRef.child('todos')
