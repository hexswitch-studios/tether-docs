import React from "react";
import Layout from "@theme/Layout";
import styles from "./thanks.module.css";
// const pic = require("@site/static/img/email-marketing-2362038_1280.png");

function Contact() {
  return (
    <Layout title="Thank you!">
      <div
        className={`${styles.container} container margin-top--lg margin-bottom--xl`}
      >
        <img
          src={"./img/email-marketing-2362038_1280.png"}
          alt="Email being recieved into post box"
        />
        <h1 className={styles.heading}>Thank you for reaching out!</h1>
        <p>
          We've received your message and will get back to you as soon as we
          can. Our support team is available Monday to Friday and will do their
          best to assist you promptly.
        </p>
      </div>
    </Layout>
  );
}

export default Contact;
