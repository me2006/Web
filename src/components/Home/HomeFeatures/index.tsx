import type { ReactNode } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Heading from "@theme/Heading";
import styles from "./style.module.css";

type FeatureItem = {
  title: string;
  imgUrl: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "1000+ Chips",
    imgUrl: "/img/home/chips.gif",
    description: (
      <>
        1000 original chips are being restored in Sitekick Remastered, with brand new chips being created regularly.
      </>
    ),
  },
  {
    title: "Made in Unity",
    imgUrl: "/img/home/unity.png",
    description: (
      <>
		Sitekick Remastered is built with Unity, providing improved performance, security, and compatibility across multiple platforms.
      </>
    ),
  },
  {
    title: "Produced by Fans",
    imgUrl: "/img/home/heart.png",
    description: (
      <>
        Sitekick Remastered is funded, developed, and maintained by players of the original game.
      </>
    ),
  },
];

function Feature({ title, imgUrl, description }: FeatureItem) {
  return (
    <div className={`col padding-vert--lg text--center ${styles.featureCard}`}>
      <img src={useBaseUrl(imgUrl)} className={styles.featureImg} role="img" alt={title} />
      <div className="padding-horiz--md">
        <Heading as="h1">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomeFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="row m-auto w-80">
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}