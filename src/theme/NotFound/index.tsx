import React, { type ReactNode } from "react";
import { translate } from "@docusaurus/Translate";
import { PageMetadata } from "@docusaurus/theme-common";
import Layout from "@theme/Layout";
import NotFoundContent from "@theme/NotFound/Content";
import styles from "./styles.module.css";

export default function Index(): ReactNode {
  const title = translate({
    id: "theme.NotFound.title",
    message: "Page Not Found",
  });
  return (
    <>
      <PageMetadata title={title} />
      <Layout wrapperClassName={ styles.errorBg }>
        <NotFoundContent className={ styles.errorContent }/>
      </Layout>
    </>
  );
}
