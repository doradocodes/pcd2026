import Image from "next/image";
import styles from "./HeroV2.module.css";

const IMAGES = [
  { src: "/assets/art-1.png", alt: "" },
  { src: "/assets/art-2.png", alt: "" },
  { src: "/assets/art-3.png", alt: "" },
  { src: "/assets/art-4.png", alt: "" },

  { src: "/assets/art-4.png", alt: "" },
  { src: "/assets/art-3.png", alt: "" },
  { src: "/assets/art-2.png", alt: "" },
  { src: "/assets/art-1.png", alt: "" },

  { src: "/assets/pointerAsset 2@2x.png", alt: "" },
  { src: "/assets/pointerAsset 6@2x.png", alt: "" },
  { src: "/assets/pointerAsset 7@2x.png", alt: "" },
  { src: "/assets/pointerAsset 8@2x.png", alt: "" },
  { src: "/assets/pointerAsset 9@2x.png", alt: "" },
];

export default function HeroV2() {
  return (
    <section className={styles.hero}>
      <div className={styles.centerContent}>
        <Image
          src="/brand/logo-monochrome-stacked.png"
          alt="PCD 2026"
          width={660}
          height={380}
          priority
          className={styles.centerLogo}
        />
      </div>
      {IMAGES.map((image, index) => (
        <img src={image.src} key={index} alt={image.alt} />
      ))}
      {/*<div className={`${styles.cell} ${styles.cellLeft}`}>*/}
      {/*  <Image src={IMAGES[0].src} alt={IMAGES[0].alt} fill sizes="50vw" />*/}
      {/*</div>*/}
      {/*<div className={`${styles.cell} ${styles.cellTopRight}`}>*/}
      {/*  <Image src={IMAGES[1].src} alt={IMAGES[1].alt} fill sizes="50vw" />*/}
      {/*</div>*/}
      {/*<div className={`${styles.cell} ${styles.cellMid}`}>*/}
      {/*  <Image src={IMAGES[2].src} alt={IMAGES[2].alt} fill sizes="31vw" />*/}
      {/*</div>*/}
      {/*<div className={`${styles.cell} ${styles.cellBot}`}>*/}
      {/*  <Image src={IMAGES[3].src} alt={IMAGES[3].alt} fill sizes="31vw" />*/}
      {/*</div>*/}
    </section>
  );
}
