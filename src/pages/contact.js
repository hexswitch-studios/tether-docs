import React from "react";
import Layout from "@theme/Layout";
import { useForm, ValidationError } from "@formspree/react";
import styles from "./contact.module.css";
import Admonition from "@theme/Admonition";

function Contact() {
  const [state, handleSubmit] = useForm("xvgrrjoj");
  if (state.succeeded) {
    const homeURL = window.location.origin;
    window.location.href = `${homeURL}/thanks`;
  }
  return (
    <Layout title="Contact ss">
      <div className={`${styles.container} container margin-vert--xl`}>
        <h1>Contact Us</h1>
        <p>
          Our support is meant to help merchants with bugs fixes, and general
          questions regarding the theme. This includes settings and existing
          features.
        </p>
        <Admonition type="info">
          <p>
            <b>Our support does not include:</b>
          </p>
          <ul>
            <li>Assistance in integrating apps.</li>
            <li>Fixing issues caused by apps or 3rd party developers.</li>
            <li>Adding new theme settings and features.</li>
          </ul>
        </Admonition>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="name"
              name="name"
              autoComplete="off"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" name="email" autoComplete="off" />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="store">Store URL</label>
            <input
              id="store"
              type="store"
              name="store"
              autoComplete="off"
              placeholder="http://www.storename.myshopify.com"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="file">File upload</label>
            <input
              id="file"
              type="file"
              name="file"
              accept="image/png, image/jpeg"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Issue description</label>
            <textarea id="description" name="description" rows="6" />
            <ValidationError
              prefix="Issue"
              field="description"
              errors={state.errors}
              required
            />
          </div>
          <button
            type="submit"
            disabled={state.submitting}
            className="button button--primary"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Contact;
