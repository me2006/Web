import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/Home';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroLeft}>
        <h1 className="hero__title">What's Sitekick Remastered?</h1>
        <p className="hero__subtitle">
          Sitekick, an online game developed for YTV.com in 2003, was discontinued in 2015 due to legacy code issues. Sitekick Remastered seeks to both preserve its assets and knowledge and create a new, enhanced version of the game.
          <br/><br/>
          Produced by fans, for fans. Sitekick Remastered is a completely free game, containing no advertisements, subscriptions, microtransactions, or any other form of monetization.
          <br/><br/>
          Sitekick Remastered is in no way affiliated with YTV Canada, Inc. and/or Corus Entertainment, Inc.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button"
            to="/download">
            Play now! 🕹️
          </Link>
          <div style={{padding: "10px"}}></div>
          <Link
            className="button button--blurple"
            to="https://discord.com/sitekickremastered">
            Join Discord
          </Link>
        </div>
      </div>
      <div className={styles.heroRight}>
        <div className={styles.heroPanelPicture}>
          <img className={styles.heroPanelImage} src={useBaseUrl("/img/home/blob.png")}></img>
          <img className={styles.heroPanelSitekickLeft} src={useBaseUrl("/img/home/sitekick_2.png")}></img>
          <img className={styles.heroPanelSitekickRight} src={useBaseUrl("/img/home/authicerderp.png")}></img>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Clickity-click, it's Sitekick!">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
