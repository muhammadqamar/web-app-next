import {
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from 'firebase/auth';
  import { auth } from '/config/firebase/firebase';


  export const handlerWithGoogleLogin = async () => {
    const googleAuth = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleAuth);
  };

  export const handlerWithFacebookLogin = () => {
    const facebookAuth = new FacebookAuthProvider();
    signInWithPopup(auth, facebookAuth)
      .then((result) => {
        console.log('result', result);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  export const createNewAccount = (userEmail, userPassword) => {
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userData) => {
        setAuthError('');
        console.log('user_data', userData);
      })
      .catch((error) => {
        console.log('error_createNewAccount', error);
        setAuthError(error.message);
      });
  };
  export const authLogin = async (userEmail, userPassword) => {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userData) => {
        setAuthError('');
        console.log('user_data', userData);
      })
      .catch((error) => {
        console.log('error', error.message);
        setAuthError(error.message);
      });
  };
  export const logout = () => {
    auth.signOut();
  };