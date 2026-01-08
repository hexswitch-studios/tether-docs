import React from "react";
import Layout from "@theme/Layout";
import releases from "/changelog/releases.json";
import styles from "./changelog.module.css";

export default function ChangelogPage() {
  return (
    <Layout title="Changelog">
      <main className={`container margin-vert--lg`}>
        <h1>Changelog</h1>
        <p>
          A complete history of changes to the Haven theme, including new
          features, improvements, and fixes across all versions.
        </p>

        <div className={`${styles.wrapper}`}>
          <div className={`${styles.glossary}`}>
            <div className={`${styles.inner}`}>
              <h2>Versions</h2>

              <ul>
                {releases.map((release) => (
                  <li key={release.id}>
                    <a href={`#v-${release.tag}`}>v{release.tag}</a>{" "}
                    <span className="date">
                      - {new Date(release.published_at).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={`${styles.container}`}>
            {releases.map((release) => (
              <div
                key={release.id}
                id={`v-${release.tag}`}
                className={`${styles.item}`}
              >
                <h2>Haven {release.name}</h2>
                <p className={`${styles.date}`}>
                  Released{" "}
                  <strong>
                    {new Date(release.published_at).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </strong>
                </p>

                {release.sections.length === 0 && <p>No details provided.</p>}

                {release.sections.map((section, i) => (
                  <div key={i} className="section">
                    {section.title && <h3>{section.title}</h3>}

                    <ul>
                      {section.items.map((item, idx) => (
                        <li
                          key={idx}
                          dangerouslySetInnerHTML={{
                            __html: convertMarkdown(item),
                          }}
                        ></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}

function convertMarkdown(md) {
  if (!md) return "";
  return md
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
}
