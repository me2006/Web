import type {ReactNode} from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

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
        Nearly every chip is being restored for use in Sitekick Remastered. We’ll continue to create and add new chips with every update.
      </>
    ),
  },
  {
    title: "Made in Unity",
    imgUrl: "/img/home/unity.png",
    description: (
      <>
        Flash Player is a thing of the past. Sitekick Remastered is made in Unity. This offers faster load times, improved security, and broader platform support.
      </>
    ),
  },
  {
    title: "Powered by Fans",
    imgUrl: "/img/home/heart.png",
    description: (
      <>
        Sitekick Remastered is paid for, developed by, and maintained by the players of the original game.
      </>
    ),
  },
];

function Feature({title,  imgUrl, description}: FeatureItem) {
  return (
    <div className={clsx("col padding-vert--md", styles.featureCard)}>
      <div className="text--center">
        <img src={useBaseUrl(imgUrl)} className={styles.featureImg} role="img" alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h1">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row" style={{margin:"auto", width:"90%"}}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
