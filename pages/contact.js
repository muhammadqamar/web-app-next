import React from 'react';
import styles from '../styles/Home.module.css'

const Contact = () => {
  return (
    <>
      <div className={styles.container}>
      <main className={styles.main}>
      <form name="contact" method="POST" data-netlify="true">
        <input type="hidden" name="form-name" value="contact"/>

          <p>
            <label>
              Your Name: <input type="text" name="name" />
            </label>
          </p>
          <p>
            <label>
              Your Email: <input type="email" name="email" />
            </label>
          </p>
          
          <p>
            <label>
              Message: <textarea name="message"></textarea>
            </label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </main>
       
      </div>
    </>
  );
};

export default Contact;
