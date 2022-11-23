import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { auth,authfb } from '../service/firebase/firebase';
import { signInWithPopup, GoogleAuthProvider,FacebookAuthProvider } from 'firebase/auth';
import { async } from '@firebase/util';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

export default function Home() {
  const [user, setUser] = useAuthState(auth);
 
  const handlerWithGoogleLogin = async () => {
    const googleAuth = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleAuth);
  };

  const handlerWithFacebookLogin= async()=>{
    const facebookAuth = new  FacebookAuthProvider();
     const result = await signInWithPopup(authfb, facebookAuth);
  }
  const logout=()=>{
    auth.signOut()
  }
  useEffect(() => {
    console.log(user);
  }, [user]);


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome <span>{user?.displayName}</span>
        </h1>
        <div className={styles.btn_div}>
          {user ? (
            <>
              <button onClick={logout}>logout</button>
            </>
          ) : (
            <>
              <button onClick={handlerWithGoogleLogin}>login With Google</button>
              <button onClick={handlerWithFacebookLogin}>login With FaceBook</button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
