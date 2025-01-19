import type { ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

//#region Header
function DownloadPage() {
  return (
    <main className={styles.downloadMain}>
      <div className={styles.downloadInner}>
        <div className={styles.downloadContent}>

          <img className={styles.downloadLogo} src={useBaseUrl("/img/logo-beta.svg")} />
          <h1 className={styles.slogan}>Made by fans, for fans</h1>

          <div className={styles.downloadInfoDiv}>
            <p>Sitekick Remastered is available for Android and Windows 10/11 devices. <br />Apple devices are not supported at this time.</p>
          </div>

          <div className={clsx("admonition alert alert--danger", styles.alertDiv)}>
            <div className={clsx("admonitionHeading", styles.alertFont)}>
              <span className={clsx("admonitionIcon", styles.alertFont)}>
                <FontAwesomeIcon icon={faWarning} />
                <b> Warning</b>
              </span>
            </div>
            <div className={clsx("admonitionContent", styles.alertFont)}>
              <p>Sitekick Remastered is still in Beta. All chips, xp, and collection lists will be wiped upon the full release.</p>
            </div>
          </div>

          <div className={styles.downloadButtonContainer}>
            <div className={styles.platformBlock}>
              <a href="https://play.google.com/store/apps/details?id=com.SitekickRemastered.Sitekick" rel="noopener" target="__blank">
                <img src={useBaseUrl("/img/download/google-play-badge.svg")} alt="Google Play Download Badge" />
              </a>
            </div>
            <div className={styles.platformBlock}>
              <a href="ms-windows-store://pdp/?productid=9P7KL6QQLP4X" rel="noopener" target="__blank">
                <img src={useBaseUrl("/img/download/windows-store-dark.svg")} alt="Windows Store Download Badge" />
              </a>
            </div>
            <div className={styles.platformBlock}>
              <a href="https://github.com/SitekickRemastered/Game/releases/" rel="noopener" target="__blank">
                <img src={useBaseUrl("/img/download/apk-badge-1.svg")} alt="GitHub APK Download Badge" />
              </a>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
//#endregion

//#region Main

export default function Download(): ReactNode {
  return (
    <Layout
      title={`Download`}
      description="Clickity-click, it's Sitekick!">
      <DownloadPage />
    </Layout>
  );
}

//#endregion
