import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from "@theme/Heading";
import clsx from 'clsx';

import styles from './index.module.css';

//#region Header
function HomeHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className={clsx("row", styles.homeRow)}>
        <div className={clsx("col col--8", styles.lOrder)}>
          <h1 className={styles.hero_title}>What's Sitekick Remastered?</h1>
          <p className={styles.hero_subtitle}>
            Sitekick, an online game developed for YTV.com in 2003, was discontinued in 2015 due to legacy code issues. Sitekick Remastered seeks to both preserve its assets and knowledge and create a new, enhanced version of the game.
            <br /><br />
            Produced by fans, for fans. Sitekick Remastered is a completely free game, containing no advertisements, subscriptions, microtransactions, or any other form of monetization.
            <br /><br />
            Sitekick Remastered is in no way affiliated with YTV Canada, Inc. and/or Corus Entertainment, Inc.
          </p>
          <div className="row" style={{ justifyContent: 'center' }}>
            <Link
              className="button button--lg margin--sm"
              to="/download">
              Play now! 🕹️
            </Link>
            <Link
              className="button button--lg button--blurple margin--sm"
              to="https://discord.com/sitekickremastered">
              Join Discord
            </Link>
          </div>
        </div>
        <div className={clsx("col col--4", styles.rOrder)}>
          <div className={styles.heroPanelPicture}>
            <img className={styles.heroPanelImage} src={useBaseUrl("/img/home/blob.svg")} />
            <img className={`${styles.heroPanelSitekick} ${styles.heroPanelSitekickLeft}`} src={useBaseUrl("/img/home/sitekick.png")} />
            <img className={`${styles.heroPanelSitekick} ${styles.heroPanelSitekickRight}`} src={useBaseUrl("/img/home/authicer.png")} />
          </div>
        </div>
      </div>
    </header>
  );
}
//#endregion

//#region Features

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

function Feature({ title, imgUrl, description }: FeatureItem) {
  return (
    <div className={clsx("col padding-vert--lg", styles.featureCard)}>
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

function HomeFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="row" style={{ margin: "auto", width: "80%" }}>
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

//#endregion

//#region MultiDeviceSupport
function MultiDeviceSupport(): ReactNode {
  return (
    <section>
      <div className={clsx("row", styles.extraCardContainer)}>

        <div className={clsx("col", styles.extraCard)}>
          <h1>Join the Team!</h1>
          <div className={clsx("row", styles.extraCardContent)}>
            <div className="col col--5">
              <img src={useBaseUrl("/img/home/kablooey_repair.png")} style={{ borderRadius: "50%"}} />
            </div>
            <div className="col col--7">
              <p>Are you a programmer, artist, animator, writer, or website designer? Interested in working on Sitekick Remastered?</p>
              <Link
                className="button margin--sm"
                to="/join_the_team">
                Learn more!
              </Link>
            </div>
          </div>
        </div>

        <div className={clsx("col", styles.extraCard)}>

          <h1 >Multi-Device Support</h1>
          <div className={clsx("row", styles.extraCardContent)}>
            <div className={clsx("col", styles.lOrder)}>
              <p>
                Sitekick Remastered is available on Google Play and the Microsoft Store. MacOS/Linux users are able to play through an Android Emulator. <b>iOS support is not planned at this time.</b>
              </p>
            </div>
            <div className={clsx("col", styles.rOrder)}>
              <img src={useBaseUrl("/img/home/devices.png")} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
//#endregion


//#region Main

export default function Home(): ReactNode {
  return (
    <Layout
      title={`Home`}
      description="Clickity-click, it's Sitekick!">
      <HomeHeader />
      <main>
        <HomeFeatures />
        <MultiDeviceSupport />
      </main>
    </Layout>
  );
}

//#endregion
