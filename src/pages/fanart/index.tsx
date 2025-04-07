import { type ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import { library, dom, IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faBluesky, faInstagram, faTumblr, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const faLinkTree = {
  prefix: "fa",
  iconName: "LinkTree",
  icon: [
    122,
    152,
    [],
    "e001",
    "M71.78,0H50.22v37.12L25.2,11.13L10.78,25.98L36.89,51.6H0v20.79h37.08l-26.3,26.17l14.43,14.66L61,76.65l35.98,36.56l14.24-14.66l-26.3-26.17H122V51.6H85.11l26.12-25.61L96.98,11.13l-25.2,25.98V0z M50.22,102.45V152h21.55v-49.55H50.22z"
  ]
};

library.add(faLinkTree as IconDefinition);
dom.watch();

type GalleryItem = {
  urls: string[];
  alt: string;
  title: string;
  isLink: boolean;
  socialLinks: object;
};

const ArtList: GalleryItem[] = [
  {
    urls: ["/img/fan_art/bkells/bkells.png"],
    alt: `"Dr. Frantic pumpkin" created by bkells`,
    title: `"Dr. Frantic pumpkin" created by bkells`,
    isLink: false,
    socialLinks: {}
  },
  {
    urls: ["/img/fan_art/cyby/cyby1.png"],
    alt: `"3D Sitekick" created by cyby`,
    title: `"3D Sitekick" created by cyby`,
    isLink: false,
    socialLinks: {}
  },
  {
    urls: ["/img/fan_art/cyby/cyby2.png",],
    alt: `"3D Sitekick insides" created by cyby`,
    title: `"3D Sitekick insides" created by cyby`,
    isLink: false,
    socialLinks: {}
  },
  {
    urls: ["/img/fan_art/cyby/cyby3.png"],
    alt: `"3D Printed Sitekick" created by cyby`,
    title: `"3D Printed Sitekick" created by cyby`,
    isLink: false,
    socialLinks: {}
  },
  {
    urls: ["/img/fan_art/puppy/puppy1.png"],
    alt: `"Puppy's Sitekick" by puppy`,
    title: `"Puppy's Sitekick" by puppy`,
    isLink: false,
    socialLinks: {
      "https://www.instagram.com/idogmini/": <FontAwesomeIcon icon={faInstagram}/>,
      "https://bsky.app/profile/idogmini.bsky.social": <FontAwesomeIcon icon={faBluesky}/>
    }
  },
  {
    urls: ["/img/fan_art/puppy/puppy2.png"],
    alt: `"Surprised Pikachu Sitekick" by puppy`,
    title: `"Surprised Pikachu Sitekick" by puppy`,
    isLink: false,
    socialLinks: {
      "https://www.instagram.com/idogmini/": <FontAwesomeIcon icon={faInstagram}/>,
      "https://bsky.app/profile/idogmini.bsky.social": <FontAwesomeIcon icon={faBluesky}/>
    }
  },
  {
    urls: ["/img/fan_art/redpen14/redpen14.png"],
    alt: `"Sitekick pumpkin" by redpen14`,
    title: `"Sitekick pumpkin" by redpen14`,
    isLink: false,
    socialLinks: {}
  },
  {
    urls: ["/img/fan_art/steph/steph3d.png", "/img/fan_art/steph/steph2.png"],
    alt: `"Fixing Kablooey" by ItsStephJM`,
    title: `"Dr Frantic repairing Kablooey" by ItsStephJM`,
    isLink: false,
    socialLinks: {
      "https://linktr.ee/itsstephjm": <FontAwesomeIcon icon={faLinkTree as IconDefinition}/>,
      "https://stephjmart.tumblr.com/": <FontAwesomeIcon icon={faTumblr} />,
      "https://www.youtube.com/@ItsStephJM": <FontAwesomeIcon icon={faYoutube} />
    }
  },
  {
    urls: ["https://www.youtube.com/embed/uSs4KQWMwIk?si=iOqPPBkDlQ1Ceclt"],
    alt: `"Uncovering YTV's Lost and Forgotten Game" by Tora https://www.youtube.com/watch?v=uSs4KQWMwIk`,
    title: `"Uncovering YTV's Lost and Forgotten Game" by Tora`,
    isLink: true,
    socialLinks: {}
  },
  {
    urls: ["https://www.youtube.com/embed/7oe_WZpAVP0?si=aZ9MW7RaVx4bskC-"],
    alt: `"Sitekick Remastered Tribute?! (December 2023)" by [GM] me2006`,
    title: `"Sitekick Remastered Tribute?! (December 2023)" by [GM] me2006`,
    isLink: true,
    socialLinks: {}
  }
];

function GalleryItem({ urls, alt, title, isLink, socialLinks }: GalleryItem) {
  return (

    <div className={styles.galleryItem}>
      <div className={styles.galleryItemInner}>
        {urls.length > 1 ?
          <div className={styles.hoverImg}>
            <img className={styles.img1} src={useBaseUrl(urls[0])} alt={alt}/>
            <img className={styles.img2} src={useBaseUrl(urls[1])} alt={alt}/>
          </div>
          : isLink ?
              <iframe width="100%" height="350px" src={urls[0]} title="YouTube video player" allowFullScreen></iframe>
          :
          <img src={useBaseUrl(urls[0])} alt={alt} />
        }
        <p className={styles.galleryTitle}>{title}</p>
        <div className={styles.socialLinks}>
        {
          Object.keys(socialLinks).map((key, idx) => (
            <a key={socialLinks[key]+idx} href={key}> {socialLinks[key]}</a>
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default function FanArt(): ReactNode {
  //const colours = ["#9c102b", "#FAF9F6", "#8397b0", "#f0ead6", "#76736e"];
  //const bgColour = colours[Math.floor(Math.random() * colours.length)];
  const bgNum = Math.floor(Math.random() * 4) + 1;
  const bgLoc = `/img/fan_art/backgrounds/background${bgNum}.png`

  return (
    <Layout title={`Fan Art`} description="Clickity-click, it's Sitekick!">
      <main style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bgLoc}) repeat`,
      }}>
        <div className={styles.fanArtContainer}>
          <div className={styles.pageTitleOuter}>
            <h1 className={styles.pageTitleInner}>Fan Art</h1>
          </div>
          <div className={styles.pageInfoOuter}>
            <p className={styles.pageInfoInner}>
              We've been seeing some really cool bits of fan art appear in our&nbsp; 
              <a href="discord.sitekickremastered.com">Discord Server</a> over the years. 
              Like YTV before us, we've decided to showcase these posts here!</p>
          </div>

          <div className={styles.masonryContainer}>
            <div className={styles.masonry}>
              {ArtList.map((props, idx) => (
                <GalleryItem key={idx} {...props} />
              ))}
            </div>
          </div>
          <div className={styles.pageInfoOuter}>
            <p className={styles.pageInfoInner}>
              If you want to post your own art, send it to general in our discord server or <a href="/contact">contact us</a> and we'll make sure to include it here!
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
