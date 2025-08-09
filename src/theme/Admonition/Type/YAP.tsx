import React, { JSX } from "react";
import Translate from "@docusaurus/Translate";
import type { Props } from "@theme/Admonition/Type/Tip";
import AdmonitionLayout from "@theme/Admonition/Layout";

const infimaClassName = "alert alert--yap";

const defaultProps = {
  icon: (
    <img
      src="https://cdn.sitekickremastered.com/images/icons/yap32.png"
      alt="YAP Icon"
      width={32}
      height={32}
      style={{ verticalAlign: "middle" }}
    />
  ),
  title: (
    <Translate
      id="theme.admonition.yap"
      description="The default label used for the YAP admonition (:::YAP)"
    >
      yap message boards
    </Translate>
  ),
};

export default function AdmonitionTypeYAP(props: Props): JSX.Element {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={`${infimaClassName} ${props.className}`}
    >
      {props.children}
    </AdmonitionLayout>
  );
}
