import React, { type ReactNode } from "react";
import Translate from "@docusaurus/Translate";
import Heading from "@theme/Heading";

import styles from "./styles.module.css";

export default function NotFoundContent(): ReactNode {
  return (
    <main className={styles.errorBg}>
      <div className="d-flex align-items-center">
        <div className={styles.errorContent}>
          <Heading as="h1" className="hero__title">
            <Translate
              id="theme.NotFound.title"
              description="The title of the 404 page">
              404: Page Not Found
            </Translate>
          </Heading>
          <p>
            <Translate
              id="theme.NotFound.p1"
              description="The first paragraph of the 404 page">
              We searched from here to dimension 34, but we couldn"t find what you were looking for.
            </Translate>
          </p>
          <p>
            <Translate
              id="theme.NotFound.p2"
              description="The 2nd paragraph of the 404 page">
              If you think this is an error, please let us know through our contact page!
            </Translate>
          </p>
        </div>
      </div>
    </main >
  );
}
