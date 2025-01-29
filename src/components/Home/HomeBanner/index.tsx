import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";
import styles from "./style.module.css";

export default function HomeBanner() {
  return (
    <div className="homeBg">
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
            <div className="row" style={{ justifyContent: "center" }}>
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
          <div className={clsx("col col--4 row--align-center", styles.rOrder)} style={{ display: "flex" }}>
            <div className={styles.heroPanelPicture}>
              <img className={styles.heroPanelImage} src={useBaseUrl("/img/home/blob.svg")} />
              <img className={`${styles.heroPanelSitekick} ${styles.heroPanelSitekickLeft}`} src={useBaseUrl("/img/home/sitekick.png")} />
              <img className={`${styles.heroPanelSitekick} ${styles.heroPanelSitekickRight}`} src={useBaseUrl("/img/home/authicer.png")} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

