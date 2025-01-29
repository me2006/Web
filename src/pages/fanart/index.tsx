import { type ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import Carousel from '../../components/Carousel';

type GalleryItem = {
  urls: string[];
  alt: string;
  title: string;
  hoverEffect: boolean;
  isLink: boolean;
};

const ArtList: GalleryItem[] = [
  
];

function GalleryItem({ urls, alt, title, hoverEffect, isLink }: GalleryItem) {
  return (

    <div className={styles.galleryItem}>
      <div className={styles.galleryItemInner}>
        {!hoverEffect && urls.length > 1 ?
          <div>
            <Carousel autoPlay={false} pictures={urls}/>
          </div>
          :
          hoverEffect ?
          <div className={styles.hoverImg}>
            <img className={styles.img1} src={useBaseUrl(urls[0])}/>
            <img className={styles.img2} src={useBaseUrl(urls[1])} /> 
          </div>
          : isLink ?
          <iframe width="100%" height="350px" src={urls[0]} title="YouTube video player" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          :
          <img src={useBaseUrl(urls[0])} alt={alt} />
        }
        <p className={styles.galleryTitle}>{title}</p>
      </div>
    </div>
  );
}

export default function FanArt(): ReactNode {
  //const colours = ["#9c102b", "#FAF9F6", "#8397b0", "#f0ead6", "#76736e"];
  //const bgColour = colours[Math.floor(Math.random() * colours.length)];
  const bgNum = Math.floor(Math.random() * 4) + 1;
  const bgLoc = `/img/fan_art/backgrounds/background${bgNum}.svg`

  return (
    <Layout title={`Fan Art`} description="Clickity-click, it's Sitekick!">
      <main style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bgLoc}) repeat`,
        backgroundSize: "contain",
        color: "#000",
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
              If you want to post your own art, send it to ⁠general and we'll make sure to include it here!
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
