import React, { JSX } from "react";
import Translate from "@docusaurus/Translate";
import type { Props } from "@theme/Admonition/Type/Tip";
import AdmonitionLayout from "@theme/Admonition/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

// This ensures that the icon CSS is loaded immediately before attempting to render icons
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false;

const infimaClassName = "alert alert--discord";

const defaultProps = {
  icon: <FontAwesomeIcon icon={faDiscord} />,
  title: (
    <Translate
      id="theme.admonition.discord"
      description="The default label used for the Discord admonition (:::discord)">
      discord
    </Translate>
  ),
};

export default function AdmonitionTypeDiscord(props: Props): JSX.Element {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={`${infimaClassName} ${props.className}`}>
      {props.children}
    </AdmonitionLayout>
  );
}
