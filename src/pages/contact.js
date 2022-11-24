import React from "react";
import styles from "../assets/styles/Home.module.scss";

const Contact = () => {
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <form name="contact" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="contact" />

            <div className={styles.inputs}>
              <label> Your Name:</label>
              <input type="text" name="name" />
            </div>
            <div className={styles.inputs}>
              <label>Your Email: </label>
              <input type="email" name="email" />
            </div>

            <div className={styles.inputs}>
              <label>Message:</label>
              <textarea name="message"></textarea>
            </div>

            <button type="submit">Send</button>
          </form>
        </main>
      </div>
    </>
  );
};

export default Contact;
