import React, { JSX } from "react";
import Translate from "@docusaurus/Translate";
import type { Props } from "@theme/Admonition/Type/Tip";
import AdmonitionLayout from "@theme/Admonition/Layout";

const infimaClassName = "alert alert--frantic";

const defaultProps = {
  icon: <img src="/img/admonitions/frantic_fact.png" alt="Frantic Icon" style={{ width: "40px" }} />,
  title: (
    <Translate
      id="theme.admonition.frantic"
      description="The default label used for the frantic admonition (:::frantic)">
      frantic fact
    </Translate>
  ),
};

export default function AdmonitionTypeFrantic(props: Props): JSX.Element {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={`${infimaClassName} ${props.className}`}>
      {props.children}
    </AdmonitionLayout>
  );
}
