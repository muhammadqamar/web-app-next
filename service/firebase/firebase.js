// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDDui7adeIonqMZjcS1tli3WlmiOUQQv0A',
  authDomain: 'web-app-next.firebaseapp.com',
  projectId: 'web-app-next',
  storageBucket: 'web-app-next.appspot.com',
  messagingSenderId: '745586650657',
  appId: '1:745586650657:web:c80fc7fb126ecea6e17d60',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
